<script lang="ts">
	import { SiteHero, SiteFooter } from '@/components';
	import {
		Installation,
		Usage,
		Types,
		Position,
		Expand as ExpandModes,
		Other
	} from '@/components/examples';

	import type { ToastTheme, ToastPosition } from '$lib';
	import { Toaster } from '$lib';

	let expand = false;
	let position: ToastPosition = 'bottom-right';
	let richColors = false;
	let closeButton = false;
	let theme: ToastTheme = 'light';
</script>

<div class="container">
	<SiteHero />
	<main class="content">
		<Installation />
		<Usage />
		<Types />
		<Position bind:position />
		<ExpandModes bind:expand />
		<Other bind:richColors bind:closeButton />
	</main>
	<SiteFooter />
</div>

<Toaster {theme} {richColors} {closeButton} {expand} {position} />

<style>
	.container {
		padding-top: 100px;
	}
</style>
