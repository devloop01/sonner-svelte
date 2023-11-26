<script lang="ts">
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { persisted } from 'svelte-persisted-store';

	type Theme = 'light' | 'dark';

	export let theme: string;

	let label: string;

	let systemTheme = getSystemTheme();
	const localTheme = persisted<Theme>('theme', systemTheme);

	const toggleTheme = () => {
		if ($localTheme === 'light') localTheme.set('dark');
		else localTheme.set('light');
	};

	const properties = {
		dark: {
			radius: 9,
			rotation: 40,
			cx: 12,
			cy: 4,
			opacity: 0
		},
		light: {
			radius: 5,
			rotation: 90,
			cx: 30,
			cy: 0,
			opacity: 1
		}
	};

	let props = spring({ ...properties[$localTheme] }, { stiffness: 0.1, damping: 0.35 });

	$: ({ cx, cy, opacity, radius, rotation } = $props);

	onMount(() => {
		const unsub = localTheme.subscribe(($theme) => {
			if ($theme === 'light') {
				document.documentElement.classList.remove('dark');
			} else {
				document.documentElement.classList.add('dark');
			}

			theme = $theme;
			props.set({ ...properties[$theme] });
			label = $theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
		});

		return () => unsub();
	});

	function getSystemTheme() {
		return (
			typeof window !== 'undefined'
				? window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
					? 'dark'
					: 'light'
				: 'light'
		) as Theme;
	}
</script>

<button type="button" on:click={toggleTheme} aria-label={label}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width="20"
		height="20"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		style:transform="rotate({rotation}deg)"
	>
		<mask id="mask">
			<rect x="0" y="0" width="100%" height="100%" fill="#fff" />
			<circle {cx} {cy} r="9" fill="black" />
		</mask>

		<circle fill="currentColor" cx="12" cy="12" r={radius} mask="url(#mask)" />

		<g stroke="currentColor" style:opacity>
			<line x1="12" y1="1" x2="12" y2="3" />
			<line x1="12" y1="21" x2="12" y2="23" />
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
			<line x1="1" y1="12" x2="3" y2="12" />
			<line x1="21" y1="12" x2="23" y2="12" />
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
		</g>
	</svg>
</button>

<style lang="postcss">
	button {
		width: 40px;
		height: 40px;
		background: var(--gray0);
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
</style>
