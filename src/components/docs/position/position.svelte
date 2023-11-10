<script lang="ts">
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

<section>
	<h3>Position</h3>
	<p>Swipe direction changes depending on the position.</p>

	<div class="buttons">
		{#each positions as position (position)}
			<button
				class="button"
				data-active={activePosition === position || undefined}
				on:click={() => (activePosition = position)}
			>
				{position}
			</button>
		{/each}
	</div>

	{#key activePosition}
		<CodeBlock code={snippet} />
	{/key}
</section>
