<script lang="ts">
	import Highlight, { HighlightSvelte } from 'svelte-highlight';
	import javascript from 'svelte-highlight/languages/javascript';
	import 'svelte-highlight/styles/grayscale-light.css';
	import CopyButton from './copy-button.svelte';

	export let code: string;
	export let language = 'svelte';
</script>

<div class="code-block">
	{#if language === 'svelte'}
		<HighlightSvelte {code} />
	{:else}
		<Highlight language={javascript} {code} />
	{/if}
	<CopyButton text={code} />
</div>

<style lang="postcss">
	.code-block {
		position: relative;
		display: grid;

		& > pre {
			font-size: 13px;
			display: block;
			margin: 0;
		}

		& > button {
			position: absolute;
			top: 8px;
			right: 8px;
			opacity: 0;
			scale: 0.75;
			transition: 150ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
			transition-property: opacity, scale, box-shadow;
			transition-delay: 300ms;
		}

		&:hover button,
		&:focus-within button {
			opacity: 1;
			scale: 1;
			transition-delay: 0ms;
		}
	}
</style>
