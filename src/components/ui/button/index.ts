import { cva, type VariantProps } from 'cva';
import { default as Button } from './button.svelte';

const buttonVariants = cva({
	base: 'relative inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium border transition-[background,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/40 disabled:pointer-events-none disabled:opacity-50',
	variants: {
		intent: {
			default: [
				'bg-gray-50 data-[active]:bg-gray-100',
				'hover:bg-gray-200/70 data-[active]:bg-gray-300/60'
			],
			primary: ['bg-black text-white', 'hover:bg-black/80'],
			secondary: ['bg-gray-100 ', 'hover:bg-gray-200/70']
		},
		size: {
			sm: 'h-7 px-2 text-xs',
			md: 'h-9 px-3 text-sm',
			lg: 'h-11 px-4 text-base'
		}
	},
	defaultVariants: {
		intent: 'default',
		size: 'md'
	}
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

export {
	Button,
	//
	buttonVariants,
	type ButtonVariants
};
