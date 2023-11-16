<script lang="ts" context="module">
	import type { ToastOptions, ToastPosition, WithTarget } from '../core/types';

	interface ToasterProps {
		hotkey: string[];
		position: ToastPosition;
		offset: string | number;
		visibleToasts: number;
		expand: boolean;
		theme: 'light' | 'dark' | 'system';
		dir: 'rtl' | 'ltr' | 'auto';
		richColors: boolean;
		invert: boolean;
		duration: number;
		gap: number;
		closeButton: boolean;
		toastOptions: ToastOptions;
		// className: string;
		// style: string;
		// loadingIcon: Renderable;
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

	function getDocumentDirection(): ToasterProps['dir'] {
		if (typeof window === 'undefined') return 'ltr';

		const dirAttribute = document.documentElement.getAttribute('dir');

		if (dirAttribute === 'auto' || !dirAttribute) {
			return window.getComputedStyle(document.documentElement).direction as ToasterProps['dir'];
		}

		return dirAttribute as ToasterProps['dir'];
	}
</script>

<script lang="ts">
	import './style.css';

	import { onDestroy } from 'svelte';
	import {
		VIEWPORT_OFFSET,
		TOAST_WIDTH,
		GAP,
		VISIBLE_TOASTS_AMOUNT,
		TOAST_LIFETIME
	} from '../core/constants';
	import { ctx } from '../core/ctx';
	import { toasts, heights } from '../core/store';
	import Toast from './toast.svelte';

	type $$Props = ToasterProps;

	export let position: $$Props['position'] = 'bottom-right';
	export let hotkey: $$Props['hotkey'] = ['altKey', 'KeyT'];
	export let expand: $$Props['expand'] | undefined = undefined;
	export let offset: $$Props['offset'] | undefined = undefined;
	export let theme: $$Props['theme'] = 'light';
	export let visibleToasts: $$Props['visibleToasts'] = VISIBLE_TOASTS_AMOUNT;
	export let dir: $$Props['dir'] = getDocumentDirection();
	export let richColors: $$Props['richColors'] | undefined = undefined;
	export let invert: $$Props['invert'] | undefined = undefined;
	export let duration: $$Props['duration'] = TOAST_LIFETIME;
	export let closeButton: $$Props['closeButton'] = false;
	export let gap: $$Props['gap'] = GAP;

	let listRef: HTMLOListElement;

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
		// $toasts = [...$toasts];
		// $toasts.map((toast) => {
		// 	const indexOfExistingToast = $toasts.findIndex((t) => t.id === toast.id);
		// 	if (indexOfExistingToast === -1) return [toast, ...$toasts];
		// 	return [
		// 		...$toasts.slice(0, indexOfExistingToast),
		// 		{ ...$toasts[indexOfExistingToast], ...toast },
		// 		...$toasts.slice(indexOfExistingToast + 1)
		// 	];
		// })[0];
	}

	// ctx.set({
	// 	toasts: $toasts,
	// 	invert: !!invert,
	// 	visibleToasts,
	// 	closeButton,
	// 	interacting,
	// 	position,
	// 	expandByDefault: !!expand,
	// 	gap,
	// 	expanded
	// });

	let timeouts = new Map<string, ReturnType<typeof setTimeout>>();
	$: ({ pausedAt } = toasts);

	$: {
		if ($pausedAt) {
			for (const [, timeoutId] of timeouts) clearTimeout(timeoutId);
			timeouts.clear();
		} else {
			const now = Date.now();
			for (const t of $toasts) {
				if (timeouts.has(t.id)) continue;
				if (t.duration === Infinity) continue;

				const durationLeft = (t.duration || 0) + t.pauseDuration - (now - t.createdAt);

				if (durationLeft < 0) {
					if (!t.delete) {
						// FIXME: This causes a recursive cycle of updates.
						toasts.dismiss(t.id);
					}
				} else {
					timeouts.set(
						t.id,
						setTimeout(() => toasts.dismiss(t.id), durationLeft)
					);
				}
			}
		}
	}

	const handleKeyDown = (event: KeyboardEvent) => {
		const isHotkeyPressed = hotkey.every((key) => (event as any)[key] || event.code === key);

		if (isHotkeyPressed) {
			expanded = true;
			listRef.focus();
		}

		if (
			event.code === 'Escape' &&
			(document.activeElement === listRef || listRef.contains(document.activeElement))
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

	onDestroy(() => {
		if (listRef && lastFocusedElementRef) {
			lastFocusedElementRef.focus({ preventScroll: true });
			lastFocusedElementRef = null;
			isFocusWithinRef = false;
		}
	});
</script>

<svelte:document on:keydown={handleKeyDown} />

{#if $toasts.length}
	<section aria-label={`Notifications ${hotkeyLabel}`} tabIndex={-1}>
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
				class={''}
				data-sonner-sv-toaster
				data-theme={actualTheme}
				data-rich-colors={richColors}
				data-y-position={y}
				data-x-position={x}
				data-dismissible={'false'}
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
				--offset: {typeof offset === 'number' ? `${offset}px` : offset || VIEWPORT_OFFSET};
				--width: {TOAST_WIDTH}px;
				--gap: {GAP}px;
				"
			>
				{#each filteredToasts as toast, index (toast.id)}
					<Toast
						{index}
						{toast}
						{duration}
						{invert}
						{visibleToasts}
						{closeButton}
						{interacting}
						{position}
						expandByDefault={expand}
						{gap}
						{expanded}
					/>
				{/each}
			</ol>
		{/each}
	</section>
{/if}
