<script lang="ts">
	import { SiteHero, SiteFooter } from '@/docs/components';
	import {
		Installation,
		Usage,
		Types,
		Position,
		Expand as ExpandModes,
		Other
	} from '@/docs/components/sections';

	import { Toaster } from '@/lib';

	let expand = false;
	let position = 'bottom-right' as const;
	let richColors = false;
	let closeButton = false;
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

<Toaster theme="light" {richColors} {closeButton} {expand} {position} />

<style>
	.container {
		padding-top: 100px;
	}
</style>
