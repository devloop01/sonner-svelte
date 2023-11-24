<script lang="ts" context="module">
	import type {
		Component,
		Direction,
		Theme,
		ToastOptions,
		ToastPosition,
		WithTarget
	} from '$lib/internal/types.js';

	interface ToasterProps {
		hotkey: string[];
		position: ToastPosition;
		offset: string | number;
		visibleToasts: number;
		expand: boolean;
		theme: Theme;
		dir: Direction;
		richColors: boolean;
		invert: boolean;
		duration: number;
		gap: number;
		closeButton: boolean;
		toastOptions: ToastOptions;
		portal: HTMLElement | string | null;
		className: string;
		style: string;
		loadingIcon: Component;
	}

	function getActualTheme(theme: string) {
		return theme !== 'system'
			? theme
			: typeof window !== 'undefined'
			  ? window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
					? 'dark'
					: 'light'
			  : 'light';
	}

	function getDocumentDirection(): Direction {
		if (typeof window === 'undefined') return 'ltr';

		const dirAttribute = document.documentElement.getAttribute('dir');

		if (dirAttribute === 'auto' || !dirAttribute) {
			return window.getComputedStyle(document.documentElement).direction as Direction;
		}

		return dirAttribute as Direction;
	}
</script>

<script lang="ts">
	import './style.css';

	import { onDestroy } from 'svelte';
	import {
		VIEWPORT_OFFSET,
		TOAST_WIDTH,
		GAP,
		VISIBLE_TOASTS_AMOUNT
	} from '$lib/internal/constants.js';
	import { toasts, heights, dismissToast } from '$lib/internal/store.js';
	import { portal } from '$lib/internal/actions/portal.js';
	import Toast from './toast.svelte';

	export let position: ToasterProps['position'] = 'bottom-right';
	export let hotkey: ToasterProps['hotkey'] = ['altKey', 'KeyT'];
	export let expand: ToasterProps['expand'] = false;
	export let offset: ToasterProps['offset'] = VIEWPORT_OFFSET;
	export let theme: ToasterProps['theme'] = 'light';
	export let visibleToasts: ToasterProps['visibleToasts'] = VISIBLE_TOASTS_AMOUNT;
	export let dir: ToasterProps['dir'] = getDocumentDirection();
	export let richColors: ToasterProps['richColors'] = false;
	export let invert: ToasterProps['invert'] = false;
	export let duration: ToasterProps['duration'] | undefined = undefined;
	export let closeButton: ToasterProps['closeButton'] = false;
	export let gap: ToasterProps['gap'] = GAP;
	export let portalElement: ToasterProps['portal'] = 'body';
	export { portalElement as portal };
	export let loadingIcon: ToasterProps['loadingIcon'] | undefined = undefined;
	export let toastOptions: ToasterProps['toastOptions'] = {};
	let className: ToasterProps['className'] = '';
	export { className as class };
	export let style: ToasterProps['style'] = '';

	let listRef: HTMLOListElement | null;

	let expanded = false;
	let interacting = false;
	let actualTheme = getActualTheme(theme);
	let isFocusWithinRef = false;
	let lastFocusedElementRef: HTMLElement | null = null;
	let hotkeyLabel = hotkey.join('+').replace(/Key/g, '').replace(/Digit/g, '');

	$: if ($toasts.length <= 1) expanded = false;

	$: possiblePositions = Array.from(
		new Set([
			position,
			...($toasts
				.filter((toast) => Boolean(toast.position))
				.map((toast) => toast.position) as ToastPosition[])
		])
	);

	$: {
		if (theme !== 'system') actualTheme = theme as string;

		if (typeof window !== 'undefined') {
			if (theme === 'system') {
				const isDark =
					window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
				if (isDark) actualTheme = 'dark';
				else actualTheme = 'light';
			}

			window
				.matchMedia('(prefers-color-scheme: dark)')
				.addEventListener('change', ({ matches }) => {
					if (matches) actualTheme = 'dark';
					else actualTheme = 'light';
				});
		}
	}

	$: {
		if (expanded || interacting) startPause();
		else endPause();
	}

	onDestroy(() => {
		if (listRef && lastFocusedElementRef) {
			lastFocusedElementRef.focus({ preventScroll: true });
			lastFocusedElementRef = null;
			isFocusWithinRef = false;
		}
	});

	const startPause = () => {
		toasts.update(($toasts) => {
			return $toasts.map((toast) => {
				if (toast.duration !== Infinity || toast.duration !== 0) {
					if (toast.timeout !== null) {
						clearTimeout(toast.timeout);
					}
					toast.pausedAt = Date.now();
				}

				return toast;
			});
		});
	};

	const endPause = () => {
		toasts.update(($toasts) => {
			return $toasts.map((toast) => {
				if (toast.duration !== Infinity || toast.duration !== 0) {
					const pausedAt = toast.pausedAt ?? toast.createdAt;
					const elapsed = pausedAt - toast.createdAt - toast.pauseDuration;
					const remaining = toast.duration - elapsed;

					toast.timeout = setTimeout(() => {
						dismissToast(toast.id);
						toast.onAutoClose?.(toast);
					}, remaining);

					toast.pauseDuration += Date.now() - pausedAt;
					toast.pausedAt = undefined;
				}

				return toast;
			});
		});
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		const isHotkeyPressed = hotkey.every((key) => (event as any)[key] || event.code === key);

		if (isHotkeyPressed) {
			expanded = true;
			listRef?.focus();
		}

		if (
			event.code === 'Escape' &&
			(document.activeElement === listRef || listRef?.contains(document.activeElement))
		) {
			expanded = false;
		}
	};

	const handleBlur = (event: WithTarget<FocusEvent, EventTarget & HTMLOListElement>) => {
		if (isFocusWithinRef && !event.currentTarget.contains(event.relatedTarget as HTMLElement)) {
			isFocusWithinRef = false;
			if (lastFocusedElementRef) {
				lastFocusedElementRef.focus({ preventScroll: true });
				lastFocusedElementRef = null;
			}
		}
	};

	const handleFocus = (event: WithTarget<FocusEvent, EventTarget & HTMLOListElement>) => {
		if (!isFocusWithinRef) {
			isFocusWithinRef = true;
			lastFocusedElementRef = event.relatedTarget as HTMLElement;
		}
	};
</script>

<svelte:document on:keydown={handleKeyDown} />

{#if $toasts.length}
	<section
		aria-label={`Notifications ${hotkeyLabel}`}
		tabIndex={-1}
		use:portal={{ target: portalElement }}
	>
		{#each possiblePositions as position, index (position)}
			{@const [y, x] = position.split('-')}
			{@const filteredToasts = $toasts.filter(
				(toast) => (!toast.position && index === 0) || toast.position === position
			)}
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ol
				bind:this={listRef}
				tabindex={-1}
				dir={dir === 'auto' ? getDocumentDirection() : dir}
				class={className}
				data-sonner-sv-toaster
				data-theme={actualTheme}
				data-rich-colors={richColors}
				data-y-position={y}
				data-x-position={x}
				on:blur={handleBlur}
				on:focus={handleFocus}
				on:mouseenter={() => (expanded = true)}
				on:mousemove={() => (expanded = true)}
				on:mouseleave={() => {
					if (!interacting) expanded = false;
				}}
				on:pointerdown={() => (interacting = true)}
				on:pointerup={() => (interacting = false)}
				style="
				--front-toast-height: {$heights[0]?.height}px;
				--offset: {typeof offset === 'number' ? `${offset}px` : offset};
				--width: {TOAST_WIDTH}px;
				--gap: {GAP}px;
				{style}
				"
			>
				{#each filteredToasts as toast, index (toast.id)}
					<Toast
						{index}
						{toast}
						duration={toastOptions.duration || duration}
						{invert}
						{visibleToasts}
						{closeButton}
						{position}
						expandByDefault={expand}
						{gap}
						{expanded}
						{loadingIcon}
						class={toastOptions.className}
						descriptionClassName={toastOptions.descriptionClassName}
						classNames={toastOptions.classNames}
						style={toastOptions.style}
						actionButtonStyle={toastOptions.actionButtonStyle}
						cancelButtonStyle={toastOptions.cancelButtonStyle}
					/>
				{/each}
			</ol>
		{/each}
	</section>
{/if}
