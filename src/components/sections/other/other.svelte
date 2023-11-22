<script lang="ts">
	import type { Example } from '../index';
	import CodeExample from '@/components/code-example.svelte';
	import HeadlessToast from './headless-toast.svelte';
	import { toast } from '$lib';

	export let richColors = false;
	export let closeButton = false;

	const getSnippet = (activeType: Example) => {
		const isRichColorsActive = activeType.name.includes('Rich');
		const isCloseButtonActive = activeType.name.includes('Close');

		return `${activeType.snippet}

// ...

<Toaster ${isRichColorsActive ? 'richColors ' : ''} ${isCloseButtonActive ? `closeButton ` : ''}/>
`;
	};

	let examples: Example[] = [
		{
			name: 'Rich Colors Success',
			snippet: `toast.success('Event has been created')`,
			action: () => {
				toast.success('Event has been created');
				richColors = true;
			}
		},
		{
			name: 'Rich Colors Error',
			snippet: `toast.error('Event has not been created')`,
			action: () => {
				toast.error('Event has not been created');
				richColors = true;
			}
		},
		{
			name: 'Rich Colors Info',
			snippet: `toast.info('Be at the area 10 minutes before the event time')`,
			action: () => {
				toast.info('Be at the area 10 minutes before the event time');
				richColors = true;
			}
		},
		{
			name: 'Rich Colors Warning',
			snippet: `toast.warning('Event start time cannot be earlier than 8am')`,
			action: () => {
				toast.warning('Event start time cannot be earlier than 8am');
				richColors = true;
			}
		},
		{
			name: 'Close Button',
			snippet: `toast('Event has been created', {
description: 'Monday, January 3rd at 6:00pm',
})`,
			action: () => {
				toast('Event has been created', {
					description: 'Monday, January 3rd at 6:00pm'
				});
				closeButton = !closeButton;
			}
		},
		{
			name: 'Headless',
			snippet: `import HeadlessToast from './HeadlessToast.svelte'

toast.custom(HeadlessToast)

// With props:
toast.custom(HeadlessToast, {
  props: {
    event: 'Louvre Museum'
  }
})`,
			action: () => {
				toast.custom(HeadlessToast, {
					props: { event: 'Louvre Museum' }
				});
				closeButton = false;
			}
		}
	];

	examples = examples.map((example) => ({
		...example,
		snippet: getSnippet(example)
	}));
</script>

<section>
	<h3>Other</h3>

	<CodeExample {examples} language="js" />
</section>
