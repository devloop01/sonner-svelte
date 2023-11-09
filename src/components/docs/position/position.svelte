<script lang="ts">
	import { Button } from '@/components/ui/button';
	import { CodeBlock } from '@/components/code-block';

	const positions = [
		'top-left',
		'top-center',
		'top-right',
		'bottom-left',
		'bottom-center',
		'bottom-right'
	] as const;

	type Position = (typeof positions)[number];

	let activePosition: Position;
	export { activePosition as position };

	$: snippet = `<Toaster position="${activePosition}" />`;
</script>

<div class="space-y-2">
	<h3 class="font-semibold text-xl">Position</h3>
	<p class="text-black/80">Swipe direction changes depending on the position.</p>

	<div class="flex gap-2 flex-wrap">
		{#each positions as position (position)}
			<Button
				data-active={activePosition === position || undefined}
				on:click={() => (activePosition = position)}
			>
				{position}
			</Button>
		{/each}
	</div>

	{#key activePosition}
		<CodeBlock code={snippet} />
	{/key}
</div>
