import type { ComponentType } from 'svelte';

export type ToastType = 'normal' | 'info' | 'warning' | 'loading' | 'success' | 'error' | 'action';

export type ToastPosition =
	| 'top-left'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-right'
	| 'top-center'
	| 'bottom-center';

export type Renderable = ComponentType | string;

export type PromiseT<T = unknown> = ValueOrFunction<Promise<T>, void>;

export interface Toast {
	id: string;
	type?: ToastType;
	title: Renderable;
	description?: Renderable;
	createdAt: number;
	icon?: ComponentType;
	duration?: number;
	position?: ToastPosition;
	invert?: boolean;
	dismissible?: boolean;
	important?: boolean;
	unstyled?: boolean;
	promise?: PromiseT;
	pauseDuration: number;
	closeDelay: number;
	timeout: ReturnType<typeof setTimeout> | null;
	pausedAt?: number;
	delete?: boolean;

	action?: {
		label: string;
		onClick: (event: MouseEvent) => void;
	};
	cancel?: {
		label: string;
		onClick?: () => void;
	};
}

export type ToastOptions = Partial<Omit<Toast, 'id' | 'type' | 'title'>> & { id?: string };

export type DefaultToastOptions = ToastOptions & {
	[key in ToastType]?: ToastOptions;
};

export type PromiseToastOptions<T = unknown> = DefaultToastOptions & {
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

export type Theme = 'light' | 'dark';

export type WithTarget<Event, Target> = Event & { currentTarget: Target };

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
export type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;
