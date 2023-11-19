<script lang="ts">
	import { CodeExample } from '@/components';

	export let expand: boolean;

	let examples = [
		{
			name: 'Expand',
			snippet: `<Toaster expand={true} />`,
			action: () => {
				expand = true;
			}
		},
		{
			name: 'Default',
			snippet: `<Toaster expand={true} />`,
			action: () => {
				expand = false;
			}
		}
	];
</script>

<section>
	<h3>Expand</h3>
	<p>
		You can change the amount of toasts visible through the <code>visibleToasts</code> prop.
	</p>

	<CodeExample {examples} />
</section>
