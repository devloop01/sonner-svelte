<script lang="ts">
	import Prism from 'prismjs';
	import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
	import 'prism-svelte';

	import { CopyButton } from '@/components/copy-button';

	export let code: string;

	export let language = 'svelte';
	const grammar = Prism.languages[language];

	let formattedCode = Prism.plugins.NormalizeWhitespace.normalize(code);
	formattedCode = Prism.highlight(code, grammar, language);
</script>

<div class="relative group">
	<pre class="language-{language} !text-sm">{@html formattedCode}</pre>
	<CopyButton
		text={code}
		class="opacity-0 scale-75 absolute top-2 right-2 transition-[opacity,transform] duration-300 delay-1000 group-hover:opacity-100 group-hover:scale-100 group-hover:delay-0"
	/>
</div>
