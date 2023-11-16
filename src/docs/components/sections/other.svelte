<script lang="ts">
	import CodeBlock from '@/docs/components/code-block.svelte';

	import { allOtherTypes, getSnippet } from '@/docs/data/sections/other';

	let activeType = allOtherTypes[0];

	$: snippet = getSnippet(activeType);
</script>

<section>
	<h3>Other</h3>

	<div class="buttons">
		{#each allOtherTypes as type (type.name)}
			<button
				class="button"
				data-active={type.name === activeType.name || undefined}
				on:click={() => (activeType = type)}
			>
				{type.name}
			</button>
		{/each}
	</div>

	{#key activeType.name}
		<CodeBlock code={snippet} language="js" />
	{/key}
</section>
