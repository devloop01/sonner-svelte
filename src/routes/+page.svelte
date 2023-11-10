<script lang="ts">
	import { Hero } from '@/components/hero';
	import { Footer } from '@/components/footer';
	import {
		Installation,
		Usage,
		Types,
		Position,
		Expand as ExpandModes,
		Other
	} from '@/components/docs';
</script>

<Hero />
<main class="content">
	<Installation />
	<Usage />
	<Types />
	<Position position="bottom-right" />
	<ExpandModes expand />
	<Other />
</main>
<Footer />
