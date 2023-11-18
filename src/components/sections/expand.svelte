<script lang="ts">
	import CodeBlock from '@/components/code-block.svelte';

	export let expand: boolean;

	$: snippet = `<Toaster expand={${expand}} />`;
</script>

<section>
	<h3>Expand</h3>
	<p>
		You can change the amount of toasts visible through the <code>visibleToasts</code> prop.
	</p>

	<div class="buttons">
		<button class="button" data-active={expand || undefined} on:click={() => (expand = true)}>
			Expand
		</button>
		<button class="button" data-active={!expand || undefined} on:click={() => (expand = false)}>
			Default
		</button>
	</div>

	{#key expand}
		<CodeBlock code={snippet} />
	{/key}
</section>
