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

	let current = examples[0];
</script>

<div>
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

	<div use:autoAnimate>
		{#each examples as example (example.name)}
			{#if example.name === current.name}
				<CodeBlock code={current.snippet} {language} />
			{/if}
		{/each}
	</div>
</div>
