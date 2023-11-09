<script lang="ts">
	import { Button } from '@/components/ui/button';
	import { CodeBlock } from '@/components/code-block';

	export let expand: boolean;

	$: snippet = `<Toaster expand={${expand}} />`;
</script>

<div class="space-y-2">
	<h3 class="font-semibold text-xl">Expand</h3>
	<p class="text-black/80">
		You can change the amount of toasts visible through the <code>visibleToasts</code> prop.
	</p>

	<div class="flex gap-2 flex-wrap">
		<Button data-active={expand || undefined} on:click={() => (expand = true)}>Expand</Button>
		<Button data-active={!expand || undefined} on:click={() => (expand = false)}>Default</Button>
	</div>

	{#key expand}
		<CodeBlock code={snippet} />
	{/key}
</div>
