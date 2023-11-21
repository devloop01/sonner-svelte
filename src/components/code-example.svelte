<script lang="ts">
	import autoAnimate from '@formkit/auto-animate';
	import CodeBlock from '@/components/code-block.svelte';

	interface Example {
		name: string;
		snippet: string;
		action?: () => void;
	}

	export let examples: Example[];
	export let language = 'svelte';
	export let showButtons = true;

	let current = examples[0];
</script>

<div>
	{#if showButtons}
		<div class="buttons">
			{#each examples as example (example.name)}
				<button
					class="button"
					data-active={example.name === current.name || undefined}
					on:click={() => {
						current = example;
						example.action?.();
					}}
				>
					{example.name}
				</button>
			{/each}
		</div>
	{/if}

	<div class="code-example" use:autoAnimate>
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
		border: 1px solid var(--gray4);
	}
</style>
