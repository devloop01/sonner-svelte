<script lang="ts">
	import { scale } from 'svelte/transition';
	import { copy } from '@svelte-put/copy';

	import { Check, Copy } from '@/components/icons';

	export let text: string;
	export let copied = false;

	function handleCopied() {
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<button
	aria-label="Copy code"
	class="copyBtn"
	use:copy={{ text }}
	on:copied={handleCopied}
	{...$$restProps}
>
	{#if copied}
		<div transition:scale>
			<svelte:component this={Copy} width="14" height="14" />
		</div>
	{:else}
		<div transition:scale>
			<svelte:component this={Check} width="14" height="14" />
		</div>
	{/if}
</button>

<style>
	.copyBtn {
		cursor: copy;
		border: none;
		border: 1px solid var(--gray6);
		background: var(--gray0);
		color: var(--gray12);
		border-radius: var(--radius);
		width: 28px;
		height: 28px;
		display: flex;
		justify-content: center;
		align-items: center;

		& > div {
			position: absolute;
			display: flex;
		}

		&:focus {
			outline: none;
		}

		&:focus-visible {
			box-shadow: 0 0 0 2px var(--gray8);
		}
	}
</style>
