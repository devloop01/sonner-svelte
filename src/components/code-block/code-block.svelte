<script lang="ts">
	import Prism from 'prismjs';
	import 'prism-svelte';

	import { CopyButton } from '@/components/copy-button';

	export let code: string;
	export let language = 'svelte';
	let grammar = Prism.languages[language];

	let formattedCode = Prism.highlight(code, grammar, language);
</script>

<div class="code-block">
	<pre class="language-{language}"><code class="language-{language}">{@html formattedCode}</code
		></pre>
	<CopyButton text={code} />
</div>

<style lang="postcss">
	.code-block {
		position: relative;
		display: grid;

		& > pre {
			font-size: 14px;
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
