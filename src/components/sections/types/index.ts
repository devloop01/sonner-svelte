export { default as Types } from './types.svelte';

import { toast } from '$lib';
import CustomToast from './custom-toast.svelte';

interface Example {
	name: string;
	snippet: string;
	action?: () => void;
}

const promiseCode = '`${data.name} toast has been added`';
export const examples: Example[] = [
	{
		name: 'Default',
		snippet: `toast('Event has been created')`,
		action: () => toast('Event has been created')
	},
	{
		name: 'Description',
		snippet: `toast.message('Event has been created', {
  description: 'Monday, January 3rd at 6:00pm',
})`,
		action: () =>
			toast('Event has been created', {
				description: 'Monday, January 3rd at 6:00pm'
			})
	},
	{
		name: 'Success',
		snippet: `toast.success('Event has been created')`,
		action: () => toast.success('Event has been created')
	},
	{
		name: 'Info',
		snippet: `toast.info('Be at the area 10 minutes before the event time')`,
		action: () => toast.info('Be at the area 10 minutes before the event time')
	},
	{
		name: 'Warning',
		snippet: `toast.warning('Event start time cannot be earlier than 8am')`,
		action: () => toast.warning('Event start time cannot be earlier than 8am')
	},
	{
		name: 'Error',
		snippet: `toast.error('Event has not been created')`,
		action: () => toast.error('Event has not been created')
	},
	{
		name: 'Action',
		snippet: `toast('Event has been created', {
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo')
  },
})`,
		action: () =>
			toast.message('Event has been created', {
				action: {
					label: 'Undo',
					onClick: () => console.log('Undo')
				}
			})
	},
	{
		name: 'Promise',
		snippet: `const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

toast.promise(promise, {
  loading: 'Loading...',
  success: (data) => {
    return ${promiseCode};
  },
  error: 'Error',
});`
		// action: () =>
		//   toast.promise<{ name: string }>(
		//     () =>
		//       new Promise((resolve) => {
		//         setTimeout(() => {
		//           resolve({ name: 'Sonner' });
		//         }, 2000);
		//       }),
		//     {
		//       loading: 'Loading...',
		//       success: (data) => {
		//         return `${data.name} toast has been added`;
		//       },
		//       error: 'Error',
		//     },
		//   ),
	},
	{
		name: 'Custom',
		snippet: `import CustomToast from './CustomToast.svelte';

toast(CustomToast)`,
		action: () => toast(CustomToast)
	}
];
