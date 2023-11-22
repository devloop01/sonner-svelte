<script lang="ts">
	import CodeExample from '@/components/code-example.svelte';

	import { examples } from './index.js';
</script>

<section>
	<h2>Types</h2>
	<p>
		You can customize the type of toast you want to render, and pass an options object as the second
		argument.
	</p>

	<CodeExample {examples} language="js" />
</section>
