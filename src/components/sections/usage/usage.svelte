<script lang="ts">
	import CodeExample from '@/components/code-example.svelte';

	import { usageCode } from './index.js';

	let examples = [
		{
			name: 'Usage',
			snippet: usageCode
		}
	];
</script>

<section>
	<h2>Usage</h2>
	<p>Render a toast on button click</p>
	<CodeExample {examples} />
</section>
