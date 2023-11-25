<script lang="ts" context="module">
	import type { Component, Toast, ToastClasses, ToastPosition } from '$lib/internal/types.js';

	interface ToastProps {
		index: number;
		toast: Toast;
		expanded: boolean;
		invert: boolean;
		gap: number;
		position: ToastPosition;
		visibleToasts: number;
		expandByDefault: boolean;
		closeButton: boolean;
		duration: number;
		loadingIcon: Component;
		style: string;
		cancelButtonStyle: string;
		actionButtonStyle: string;
		class: string;
		descriptionClass: string;
		classes: ToastClasses;
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { toasts, heights, addToastToRemoveQueue, dismissToast } from '$lib/internal/store.js';
	import { SWIPE_THRESHOLD } from '$lib/internal/constants.js';
	import { noop, cn } from '$lib/internal/utils.js';
	import Icon from './icon.svelte';
	import LoaderIcon from './loader.svelte';

	export let index: ToastProps['index'];
	export let toast: ToastProps['toast'];
	export let expanded: ToastProps['expanded'] = false;
	let toastInvert: ToastProps['invert'] | undefined = undefined;
	export { toastInvert as invert };
	export let gap: ToastProps['gap'];
	export let position: ToastProps['position'];
	export let visibleToasts: ToastProps['visibleToasts'];
	export let expandByDefault: ToastProps['expandByDefault'] | undefined = undefined;
	export let closeButton: ToastProps['closeButton'];
	export let duration: ToastProps['duration'] | undefined = undefined;
	export let loadingIcon: ToastProps['loadingIcon'] | undefined = undefined;
	export let style: ToastProps['style'] = '';
	export let cancelButtonStyle: ToastProps['cancelButtonStyle'] = '';
	export let actionButtonStyle: ToastProps['actionButtonStyle'] = '';
	let className: ToastProps['class'] = '';
	export { className as class };
	export let descriptionClass: ToastProps['descriptionClass'] = '';
	export let classes: ToastProps['classes'] = {};

	let toastRef: HTMLLIElement | null;

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

		if (!toastRef) return;
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

		return () => {
			toast.timeout && clearTimeout(toast.timeout);
		};
	});

	$: {
		// this ensures that when toast is updated with a new duration, we update the timeout
		// happens when toast state changes from loading to success/error
		if (mounted) {
			toast.timeout =
				toast.duration === Infinity
					? null
					: setTimeout(() => {
							dismissToast(toast.id);
					  }, duration || toast.duration);
		}
	}

	// if toast is dismissed, remove it
	$: toast.dismiss && deleteToast();

	const deleteToast = () => {
		// Save the offset for the exit swipe animation
		removed = true;
		offsetBeforeRemove = offset;
		heights.update((heights) => heights.filter((h) => h.toastId !== toast.id));
		addToastToRemoveQueue(toast.id);
	};

	const handlePointerDown = (event: PointerEvent) => {
		if (disabled || !dismissible) return;
		dragStartTime = new Date();
		offsetBeforeRemove = offset;
		// Ensure we maintain correct pointer capture even when going outside of the toast (e.g. when swiping)
		(event.target as HTMLElement).setPointerCapture(event.pointerId);
		if ((event.target as HTMLElement).tagName === 'BUTTON') return;
		swiping = true;
		pointerStart = { x: event.clientX, y: event.clientY };
	};

	const handlePointerUp = () => {
		if (!toastRef || swipeOut || !dismissible) return;

		pointerStart = null;
		const swipeAmount = +toastRef.style.getPropertyValue('--swipe-amount').replace('px', '') || 0;
		const timeTaken = new Date().getTime() - (dragStartTime?.getTime() || 0);
		const velocity = Math.abs(swipeAmount) / timeTaken;

		// Remove only if threshold is met
		if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > 0.11) {
			offsetBeforeRemove = offset;
			toast.onDismiss?.(toast);
			deleteToast();
			swipeOut = true;
			return;
		}

		toastRef.style.setProperty('--swipe-amount', '0px');
		swiping = false;
	};

	const handlePointerMove = (event: PointerEvent) => {
		if (!toastRef || !pointerStart || !dismissible) return;

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
	class={cn(
		className,
		toast.class,
		classes?.toast,
		toast?.classes?.toast,
		// @ts-ignore
		classes?.[toastType],
		// @ts-ignore
		toast?.classes?.[toastType]
	)}
	data-sonner-sv-toast
	data-styled={!Boolean(toast.component || toast.unstyled)}
	data-mounted={mounted}
	data-promise={!!toast.promise}
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
	data-expanded={expanded || (expandByDefault && mounted)}
	on:pointerdown={handlePointerDown}
	on:pointerup={handlePointerUp}
	on:pointermove={handlePointerMove}
	style="
		--index: {index};
		--toasts-before: {index};
		--z-index: {$toasts.length - index};
		--offset: {removed ? offsetBeforeRemove : offset}px;
		--initial-height: {expandByDefault ? 'auto' : `${initialHeight}px`};
		--gap-between: {gap}px;
		{style}
	"
>
	{#if closeButton}
		<button
			aria-label="Close toast"
			data-disabled={disabled}
			data-close-button
			class={cn(classes.closeButton, toast.classes?.closeButton)}
			on:click={disabled || !dismissible
				? noop
				: () => {
						deleteToast();
						toast.onDismiss?.(toast);
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

	{#if toast.component}
		<svelte:component this={toast.component} {...toast.props} {toast} />
	{:else if typeof toast.title !== 'string'}
		<svelte:component this={toast.title} {...toast.props} />
	{:else}
		{#if toastType || toast.icon || toast.promise}
			{@const isLoading = toastType === 'loading'}
			<div data-icon>
				{#if toast.promise || isLoading}
					{#if loadingIcon}
						<div
							class={cn('loader', classes.loader, toast.classes?.loader)}
							data-visible={isLoading}
						>
							<svelte:component this={loadingIcon} />
						</div>
					{:else}
						<LoaderIcon visible={isLoading} />
					{/if}
				{/if}

				{#if toast.icon}
					<svelte:component this={toast.icon} />
				{:else}
					<Icon type={toastType} />
				{/if}
			</div>
		{/if}

		<div data-content>
			<span data-title class={cn(classes.title, toast.classes?.title)}>
				{toast.title}
			</span>
			{#if toast.description}
				<span
					data-description
					class={cn(
						descriptionClass,
						toast.descriptionClass,
						classes.description,
						toast.classes?.description
					)}
				>
					{toast.description}
				</span>
			{/if}
		</div>

		{#if toast.cancel}
			<button
				data-button
				data-cancel
				style={cancelButtonStyle}
				class={cn(classes.cancelButton, toast.classes?.cancelButton)}
				on:click={() => {
					if (!dismissible) return;
					deleteToast();
					toast.cancel?.onClick?.();
				}}
			>
				{toast.cancel.label}
			</button>
		{/if}

		{#if toast.action}
			<button
				data-button
				style={actionButtonStyle}
				class={cn(classes.actionButton, toast.classes?.actionButton)}
				on:click={(event) => {
					toast.action?.onClick(event);
					if (event.defaultPrevented) return;
					deleteToast();
				}}
			>
				{toast.action.label}
			</button>
		{/if}
	{/if}
</li>
