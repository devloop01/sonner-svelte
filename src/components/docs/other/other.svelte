<script lang="ts">
	import { Button } from '@/components/ui/button';
	import { CodeBlock } from '@/components/code-block';

	import { allOtherTypes, getSnippet } from './index';

	let activeType = allOtherTypes[0];

	$: snippet = getSnippet(activeType);
</script>

<div class="space-y-2">
	<h3 class="font-semibold text-xl">Other</h3>

	<div class="flex gap-2 flex-wrap">
		{#each allOtherTypes as type (type.name)}
			<Button on:click={() => (activeType = type)}>
				{type.name}
			</Button>
		{/each}
	</div>

	{#key activeType.name}
		<CodeBlock code={snippet} language="js" />
	{/key}
</div>
