export type Example = {
	name: string;
	snippet: string;
	action?: () => void;
	active?: boolean;
};

export { default as Installation } from './installation.svelte';
export { Usage } from './usage';
export { Types } from './types';
export { default as Position } from './position.svelte';
export { default as Expand } from './expand.svelte';
export { Other } from './other';
