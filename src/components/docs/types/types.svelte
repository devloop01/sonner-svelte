<script lang="ts">
	import { Button } from '@/components/ui/button';
	import { CodeBlock } from '@/components/code-block';

	import { allTypes } from './index';

	let activeType = allTypes[0];
</script>

<div class="space-y-2">
	<h3 class="font-semibold text-xl">Types</h3>
	<p class="text-black/80">
		You can customize the type of toast you want to render, and pass an options object as the second
		argument.
	</p>

	<div class="flex gap-2 flex-wrap">
		{#each allTypes as type (type.name)}
			<Button
				data-active={type.name === activeType.name || undefined}
				on:click={() => (activeType = type)}
			>
				{type.name}
			</Button>
		{/each}
	</div>

	{#key activeType.name}
		<CodeBlock code={activeType.snippet} language="js" />
	{/key}
</div>
