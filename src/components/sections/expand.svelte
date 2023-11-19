<script lang="ts">
	import { CodeExample } from '@/components';
  import { toast } from '$lib'

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
