import type { SvelteComponent } from 'svelte';

export type ToastType = 'normal' | 'action' | 'success' | 'info' | 'warning' | 'error' | 'loading';

export type ToastPosition =
	| 'top-left'
	| 'top-center'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-center'
	| 'bottom-right'
	| 'top-start'
	| 'top-end'
	| 'bottom-start'
	| 'bottom-end';

export type Renderable = typeof SvelteComponent | string;

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
export type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;

export interface Toast {
	id: string;
	type?: ToastType;
	title: Renderable;
	description?: Renderable;
	createdAt: number;
	icon?: typeof SvelteComponent;
	duration?: number;
	position?: ToastPosition;
	invert?: boolean;
	dismissible?: boolean;
	important?: boolean;
	unstyled?: boolean;
	promise?: boolean;
	pauseDuration: number;
	delete?: boolean;
	// height?: number;
}

export type ToastOptions = Partial<
	Pick<Toast, 'id' | 'icon' | 'duration' | 'position' | 'description' | 'dismissible'>
>;

export type DefaultToastOptions = ToastOptions & {
	[key in ToastType]?: ToastOptions;
};

export interface ToasterContext {
	// toasts: Writable<Toast[]>;
	// heights: Writable<HeightT[]>;
	// invert: boolean;
	// visibleToasts: number;
	// closeButton: boolean;
	// interacting: boolean;
	// position: ToastPosition;
	// expandByDefault: boolean;
	// gap: number;
	// expanded: boolean;
}

export interface HeightT {
	height: number;
	toastId: number | string;
}

export type WithTarget<Event, Target> = Event & { currentTarget: Target };