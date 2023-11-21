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

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
export type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;

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
	promise?: boolean;
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

export type ToastOptions = Partial<
	Pick<
		Toast,
		'id' | 'icon' | 'duration' | 'position' | 'description' | 'dismissible' | 'action' | 'cancel'
	>
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

export enum SwipeStateTypes {
	SwipedOut = 'SwipedOut',
	SwipedBack = 'SwipedBack',
	NotSwiped = 'NotSwiped'
}

export type Theme = 'light' | 'dark';

export type WithTarget<Event, Target> = Event & { currentTarget: Target };
