<script lang="ts">
	import { CodeExample } from '@/components';

	import { usageCode } from './index.js';

	let examples = [
		{
			name: 'Usage',
			snippet: usageCode
		}
	];
</script>

<section>
	<h3>Usage</h3>
	<p>Render a toast on button click</p>
	<CodeExample {examples} showButtons={false} />
</section>
