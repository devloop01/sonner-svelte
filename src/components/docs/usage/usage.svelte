<script lang="ts">
	import CodeBlock from '@/components/code-block/code-block.svelte';

	import { usageCode } from './index';
</script>

<div class="space-y-2">
	<h3 class="font-semibold text-xl">Usage</h3>
	<p class="text-black/80">Render a toast on button click</p>
	<CodeBlock code={usageCode} />
</div>
