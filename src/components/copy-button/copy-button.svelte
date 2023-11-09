<script lang="ts">
	import { cx } from 'cva';
	import { scale } from 'svelte/transition';
	import { copy } from '@svelte-put/copy';

	export let text: string;
	export let copied = false;
	let className: string | undefined = undefined;
	export { className as class };

	function handleCopied() {
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<button
	aria-label="Copy code"
	class={cx('btn--copy', className)}
	use:copy={{ text }}
	on:copied={handleCopied}
>
	{#if copied}
		<div transition:scale>
			<svg
				viewBox="0 0 24 24"
				width="14"
				height="14"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				fill="none"
				shape-rendering="geometricPrecision"
			>
				<path d="M20 6L9 17l-5-5" />
			</svg>
		</div>
	{:else}
		<div transition:scale>
			<svg
				viewBox="0 0 24 24"
				width="14"
				height="14"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				fill="none"
				shape-rendering="geometricPrecision"
			>
				<path
					d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z"
				/>
			</svg>
		</div>
	{/if}
</button>

<style lang="postcss">
	.btn--copy {
		cursor: copy;
		border-radius: 50%;
		border: none;
		border: 1px solid theme(colors.gray.300);
		background: #fff;
		color: theme(colors.gray.800);
		border-radius: 5px;
		width: theme(width.7);
		height: theme(width.7);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.btn--copy:focus {
		outline: none;
		@apply ring-1 ring-black/40;
	}

	.btn--copy div {
		position: absolute;
		display: flex;
	}
</style>
