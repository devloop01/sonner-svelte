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
</script>

<div class="container">
	<SiteHero />
	<main class="content">
		<Installation />
		<Usage />
		<Types />
		<Position position="bottom-right" />
		<ExpandModes expand />
		<Other />
	</main>
	<SiteFooter />
</div>

<Toaster />

<style>
	.container {
		padding-top: 100px;
	}
</style>
