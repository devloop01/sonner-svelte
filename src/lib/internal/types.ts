import type { SvelteComponent } from 'svelte';

export type ToastType =
	| 'normal'
	| 'info'
	| 'warning'
	| 'loading'
	| 'success'
	| 'error'
	| 'action'
	| 'custom';

export type ToastPosition =
	| 'top-left'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-right'
	| 'top-center'
	| 'bottom-center';

export type RecordT = Record<string, unknown>;

export type Component<T extends RecordT = RecordT> = typeof SvelteComponent<T>;

export type Renderable<T extends RecordT = RecordT> = Component<T> | string;

export type PromiseT<T = unknown> = ValueOrFunction<Promise<T>, void>;

export interface Toast<T extends RecordT = RecordT> {
	id: string;
	type?: ToastType;
	title: Renderable;
	description?: Renderable;
	createdAt: number;
	icon?: Component;
	duration: number;
	position?: ToastPosition;
	invert?: boolean;
	dismissible?: boolean;
	important?: boolean;
	promise?: PromiseT;
	pauseDuration: number;
	timeout: ReturnType<typeof setTimeout> | null;
	pausedAt?: number;
	dismiss?: boolean;
	component?: Component<T>;
	props?: Omit<T, 'toast'>;
	unstyled?: boolean;

	action?: {
		label: string;
		onClick: (event: MouseEvent) => void;
	};
	cancel?: {
		label: string;
		onClick?: () => void;
	};

	onDismiss?: (toast: Toast<T>) => void;
	onAutoClose?: (toast: Toast<T>) => void;

	style?: string;
	cancelButtonStyle?: string;
	actionButtonStyle?: string;
	class?: string;
	descriptionClass?: string;
	classes?: ToastClasses;
}

export type ToastOptions<T extends RecordT = RecordT> = Partial<
	Omit<
		Toast<T>,
		| 'type'
		| 'title'
		| 'component'
		| 'props'
		| 'dismiss'
		| 'promise'
		| 'createdAt'
		| 'pauseDuration'
		| 'timeout'
		| 'pausedAt'
	>
>;

export type PromiseToastOptions<T = unknown> = ToastOptions & {
	loading: Renderable;
	success: ValueOrFunction<Renderable, T>;
	error: ValueOrFunction<Renderable, unknown>;
	finally?: () => void | Promise<void>;
};

export interface HeightT {
	height: number;
	toastId: number | string;
}

export interface ToastClasses {
	toast?: string;
	title?: string;
	description?: string;
	loader?: string;
	closeButton?: string;
	cancelButton?: string;
	actionButton?: string;
	success?: string;
	error?: string;
	info?: string;
	warning?: string;
}

export enum SwipeStateTypes {
	SwipedOut = 'SwipedOut',
	SwipedBack = 'SwipedBack',
	NotSwiped = 'NotSwiped'
}

export type Theme = 'light' | 'dark' | 'system';
export type Direction = 'ltr' | 'rtl' | 'auto';

export type WithTarget<Event, Target> = Event & { currentTarget: Target };

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
export type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;
