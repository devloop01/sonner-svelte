<script lang="ts">
	import CodeExample from '@/components/code-example.svelte';
	import { toast } from '$lib';

	export let expand: boolean;

	let examples = [
		{
			name: 'Expand',
			snippet: `<Toaster expand={true} />`,
			action: () => {
				expand = true;
				toast('Event has been created', {
					description: 'Monday, January 3rd at 6:00pm'
				});
			}
		},
		{
			name: 'Default',
			snippet: `<Toaster expand={false} />`,
			action: () => {
				expand = false;
				toast('Event has been created', {
					description: 'Monday, January 3rd at 6:00pm'
				});
			},
			active: true
		}
	];
</script>

<section>
	<h2>Expand</h2>
	<p>
		You can change the amount of toasts visible through the <code>visibleToasts</code> prop.
	</p>

	<CodeExample {examples} />
</section>
