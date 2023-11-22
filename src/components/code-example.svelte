<script lang="ts">
	import autoAnimate from '@formkit/auto-animate';
	import CodeBlock from '@/components/code-block.svelte';
	import type { Example } from './sections';

	export let examples: Example[];
	export let language = 'svelte';

	let current = examples.find((example) => example.active) || examples[0];
</script>

<div>
	{#if examples.length > 1}
		<div class="buttons">
			{#each examples as example (example.name)}
				<button
					class="button"
					data-active={example.name === current.name || undefined}
					on:click={() => {
						current = example;
						example.action?.();
						examples = examples.map((example) => ({
							...example,
							active: example.name === current.name
						}));
					}}
				>
					{example.name}
				</button>
			{/each}
		</div>
	{/if}

	<div class="code-example" use:autoAnimate={{ duration: 180, easing: 'linear' }}>
		{#each examples as example (example.name)}
			{#if example.name === current.name}
				<CodeBlock code={current.snippet} {language} />
			{/if}
		{/each}
	</div>
</div>

<style lang="postcss">
	.code-example {
		background: var(--gray1);
		border-radius: var(--radius);
		border: 1px solid var(--gray5);
	}
</style>
