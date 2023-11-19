<script lang="ts">
	import { CodeExample } from '@/components';
	import { toast } from '$lib';

	export let richColors = false;
	export let closeButton = false;

	interface Example {
		name: string;
		snippet: string;
		action?: () => void;
	}

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
			snippet: `toast.custom((t) => (
<div>
  <h1>Custom toast</h1>
   <button onClick={() => toast.dismiss(t)}>Dismiss</button>
</div>
));`
			//   action: () => {
			//     toast.custom(
			//       (t) => (
			//         <div className={styles.headless}>
			//           <p className={styles.headlessTitle}>Event Created</p>
			//           <p className={styles.headlessDescription}>Today at 4:00pm - &quot;Louvre Museum&quot;</p>
			//           <button className={styles.headlessClose} onClick={() => toast.dismiss(t)}>
			//             <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
			//               <path d="M2.96967 2.96967C3.26256 2.67678 3.73744 2.67678 4.03033 2.96967L8 6.939L11.9697 2.96967C12.2626 2.67678 12.7374 2.67678 13.0303 2.96967C13.3232 3.26256 13.3232 3.73744 13.0303 4.03033L9.061 8L13.0303 11.9697C13.2966 12.2359 13.3208 12.6526 13.1029 12.9462L13.0303 13.0303C12.7374 13.3232 12.2626 13.3232 11.9697 13.0303L8 9.061L4.03033 13.0303C3.73744 13.3232 3.26256 13.3232 2.96967 13.0303C2.67678 12.7374 2.67678 12.2626 2.96967 11.9697L6.939 8L2.96967 4.03033C2.7034 3.76406 2.6792 3.3474 2.89705 3.05379L2.96967 2.96967Z"></path>
			//             </svg>
			//           </button>
			//         </div>
			//       ),
			//       { duration: 999999 },
			//     );
			//     setCloseButton((t) => !t);
			//   },
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
