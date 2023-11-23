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
	title: Renderable<T>;
	description?: Renderable<T>;
	createdAt: number;
	icon?: Component<T>;
	duration?: number;
	position?: ToastPosition;
	invert?: boolean;
	dismissible?: boolean;
	important?: boolean;
	promise?: PromiseT;
	pauseDuration: number;
	closeDelay: number;
	timeout: ReturnType<typeof setTimeout> | null;
	pausedAt?: number;
	delete?: boolean;
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
}

export type ToastOptions<T extends RecordT = RecordT> = Partial<
	Omit<Toast<T>, 'id' | 'type' | 'title'>
> & { id?: string };

export type PromiseToastOptions<T = unknown> = ToastOptions & {
	loading: Renderable;
	success: ValueOrFunction<Renderable, T>;
	error: ValueOrFunction<Renderable, unknown>;
};

export interface ToasterContext {}

export interface HeightT {
	height: number;
	toastId: number | string;
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
