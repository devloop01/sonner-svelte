<script lang="ts">
	import CodeBlock from '@/components/code-block.svelte';

	import { allTypes } from './index.js';

	let activeType = allTypes[0];
</script>

<section>
	<h3>Types</h3>
	<p>
		You can customize the type of toast you want to render, and pass an options object as the second
		argument.
	</p>

	<div class="buttons">
		{#each allTypes as type (type.name)}
			<button
				class="button"
				data-active={type.name === activeType.name || undefined}
				on:click={() => {
					activeType = type;
					activeType.action?.();
				}}
			>
				{type.name}
			</button>
		{/each}
	</div>

	{#key activeType.name}
		<CodeBlock code={activeType.snippet} language="js" />
	{/key}
</section>
