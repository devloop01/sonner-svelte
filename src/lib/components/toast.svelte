<script lang="ts" context="module">
	import type { Toast, ToastPosition } from '../core/types';

	interface ToastProps {
		index: number;
		toast: Toast;
		position: ToastPosition;
		visibleToasts: number;
		expandByDefault: boolean;
		gap: number;
		expanded: boolean;
		invert: boolean;
		duration: number;
		closeButton: boolean;
		interacting: boolean;
	}
</script>

<script lang="ts">
	import { SvelteComponent, onMount } from 'svelte';
	// import { ctx } from '../core/ctx';
	import { toasts, heights } from '../core/store';
	import { SWIPE_THRESHOLD, TIME_BEFORE_UNMOUNT } from '../core/constants';
	import { LoaderIcon, getIcon } from './icons';

	export let toast: ToastProps['toast'];
	export let position: ToastProps['position'];
	export let index: ToastProps['index'];
	export let visibleToasts: ToastProps['visibleToasts'];
	export let expandByDefault: ToastProps['expandByDefault'] | undefined = undefined;
	export let gap: ToastProps['gap'];
	export let expanded: ToastProps['expanded'] = false;
	let toastInvert: ToastProps['invert'] | undefined = undefined;
	export { toastInvert as invert };
	export let duration: ToastProps['duration'];
	export let closeButton: ToastProps['closeButton'];
	export let interacting: ToastProps['interacting'];

	let toastRef: HTMLLIElement;
	let mounted = false;
	let removed = false;
	let swiping = false;
	let swipeOut = false;

	$: toastType = toast.type;
	$: dismissible = toast.dismissible !== false;
	$: invert = toast.invert || toastInvert;
	$: disabled = toast.type === 'loading';

	let initialHeight = 0;
	let offsetBeforeRemove = 0;
	$: isVisible = index + 1 <= visibleToasts;
	$: isFront = index === 0;
	$: [y, x] = position.split('-');

	$: heightIndex = $heights.findIndex((height) => height.toastId === toast.id) || 0;
	$: toastsHeightBefore = $heights.reduce((prev, curr, reducerIndex) => {
		// Calculate offset up until current  toast
		if (reducerIndex >= heightIndex) return prev;
		return prev + curr.height;
	}, 0);
	$: offset = heightIndex * gap + toastsHeightBefore;

	let dragStartTime: Date | null = null;
	let pointerStart: { x: number; y: number } | null = null;

	onMount(() => {
		mounted = true;

		const originalHeight = toastRef.style.height;
		toastRef.style.height = 'auto';
		const height = toastRef.getBoundingClientRect().height;
		toastRef.style.height = originalHeight;

		initialHeight = height;

		heights.update((heights) => {
			let toastId = toast.id;
			const alreadyExists = heights.find((h) => h.toastId === toastId);
			if (!alreadyExists) {
				return [{ toastId, height }, ...heights];
			} else {
				return heights.map((h) => (h.toastId === toastId ? { ...h, height } : h));
			}
		});
	});

	$: toast.delete && deleteToast();

	const deleteToast = () => {
		// Save the offset for the exit swipe animation
		removed = true;
		offsetBeforeRemove = offset;
		heights.update((heights) => heights.filter((h) => h.toastId !== toast.id));
		toasts.addToRemoveQueue(toast.id);
	};

	const handlePointerDown = (event: PointerEvent) => {
		if (disabled || !dismissible) return;
		dragStartTime = new Date();
		offsetBeforeRemove = offset;
		// Ensure we maintain correct pointer capture even when going outside of the toast (e.g. when swiping)
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
		if ((event.currentTarget as HTMLElement).tagName === 'BUTTON') return;
		swiping = true;
		pointerStart = { x: event.clientX, y: event.clientY };
	};

	const handlePointerUp = (event: PointerEvent) => {
		if (swipeOut || !dismissible) return;

		pointerStart = null;
		const swipeAmount = +toastRef.style.getPropertyValue('--swipe-amount').replace('px', '') || 0;
		const timeTaken = new Date().getTime() - (dragStartTime?.getTime() || 0);
		const velocity = Math.abs(swipeAmount) / timeTaken;

		// Remove only if threshold is met
		if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > 0.11) {
			offsetBeforeRemove = offset;
			//   toast.onDismiss?.(toast);
			deleteToast();
			swipeOut = true;
			return;
		}

		toastRef.style.setProperty('--swipe-amount', '0px');
		swiping = false;
	};

	const handlePointerMove = (event: PointerEvent) => {
		if (!pointerStart || !dismissible) return;

		const yPosition = event.clientY - pointerStart.y;
		const xPosition = event.clientX - pointerStart.x;

		const clamp = y === 'top' ? Math.min : Math.max;
		const clampedY = clamp(0, yPosition);
		const swipeStartThreshold = event.pointerType === 'touch' ? 10 : 2;
		const isAllowedToSwipe = Math.abs(clampedY) > swipeStartThreshold;

		if (isAllowedToSwipe) {
			toastRef.style.setProperty('--swipe-amount', `${yPosition}px`);
		} else if (Math.abs(xPosition) > swipeStartThreshold) {
			// User is swiping in wrong direction so we disable swipe gesture
			// for the current pointer down interaction
			pointerStart = null;
		}
	};
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<li
	bind:this={toastRef}
	tabindex={0}
	aria-live={toast.important ? 'assertive' : 'polite'}
	aria-atomic="true"
	role="status"
	class=""
	data-sonner-sv-toast
	data-styled={!toast.unstyled}
	data-mounted={mounted}
	data-promise={toast.promise}
	data-removed={removed}
	data-visible={isVisible}
	data-y-position={y}
	data-x-position={x}
	data-index={index}
	data-front={isFront}
	data-swiping={swiping}
	data-dismissible={dismissible}
	data-type={toastType}
	data-invert={invert}
	data-swipe-out={swipeOut}
	data-expanded={Boolean(expanded || (expandByDefault && mounted))}
	on:pointerdown={handlePointerDown}
	on:pointerup={handlePointerUp}
	on:pointermove={handlePointerMove}
	style="
		--index: {index};
		--toasts-before: {index};
		--z-index: {$toasts.length - index};
		--offset: {removed ? offsetBeforeRemove : offset}px;
		--initial-height: {expandByDefault ? 'auto' : `${initialHeight}px`};
	"
>
	{#if closeButton}
		<button
			aria-label="Close toast"
			data-disabled={disabled}
			data-close-button
			on:click={disabled || !dismissible
				? () => {}
				: () => {
						deleteToast();
						//   toast.onDismiss?.(toast);
				  }}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="12"
				height="12"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<line x1="18" y1="6" x2="6" y2="18"></line>
				<line x1="6" y1="6" x2="18" y2="18"></line>
			</svg>
		</button>
	{/if}

	<!-- {#if toast.title && typeof toast.title !== 'string'}
		<svelte:component this={toast.title} />
	{/if} -->
	{#if toastType || toast.icon || toast.promise}
		<div data-icon>
			{#if (toast.promise || toast.type === 'loading') && !toast.icon}
				<LoaderIcon visible={toastType === 'loading'} />
			{/if}
			{#if toast.icon}
				<!-- <svelte:component this={toast.icon} /> -->
			{/if}
			<svelte:component this={getIcon(toastType)} />
		</div>
	{/if}

	<div data-content>
		<span data-title>{toast.title}</span>
		{#if toast.description}
			<span data-description>{toast.description}</span>
		{/if}
	</div>

	{#if false}
		<button
			data-button
			data-cancel
			on:click={() => {
				if (!dismissible) return;
				deleteToast();
				//   if (toast.cancel?.onClick) {
				// toast.cancel.onClick();
				//   }
			}}
		>
			<!-- {toast.cancel.label} -->
		</button>
	{/if}

	{#if false}
		<button
			data-button
			on:click={(event) => {
				//   toast.action?.onClick(event);
				//   if (event.defaultPrevented) return;
				deleteToast();
			}}
		>
			<!-- {toast.action.label} -->
		</button>
	{/if}
</li>