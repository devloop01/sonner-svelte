<script lang="ts">
	import { Hero } from '@/components/hero';
	import { Footer } from '@/components/footer';
	import { Installation, Usage, Types, Position, Expand, Other } from '@/components/docs';
</script>

<svelte:head>
	<title>Sonner Svelte</title>
</svelte:head>

<div class="w-full pt-32">
	<Hero />

	<section class="my-24 space-y-16">
		<Installation />
		<Usage />
		<Types />
		<Position position="bottom-right" />
		<Expand expand />
		<Other />
	</section>

	<Footer />
</div>
