<script lang="ts">
	import CodeBlock from '@/docs/components/code-block.svelte';

	import { allOtherTypes, getSnippet } from '@/docs/data/sections/other';

	export let richColors = false;
	export let closeButton = false;

	let activeType = allOtherTypes[0];

	$: snippet = getSnippet(activeType);

	function handleClick(currentType: typeof activeType) {
		activeType = currentType;
		const richColorsActive = currentType?.name?.includes('Rich');
		const closeButtonActive = currentType?.name?.includes('Close');
		if (richColorsActive) {
			richColors = true;
			closeButton = false;
		} else if (closeButtonActive) {
			richColors = false;
			closeButton = !closeButton;
		} else {
			richColors = false;
			closeButton = false;
		}
	}
</script>

<section>
	<h3>Other</h3>

	<div class="buttons">
		{#each allOtherTypes as type (type.name)}
			<button
				class="button"
				data-active={type.name === activeType.name || undefined}
				on:click={() => handleClick(type)}
			>
				{type.name}
			</button>
		{/each}
	</div>

	{#key activeType.name}
		<CodeBlock code={snippet} language="js" />
	{/key}
</section>
