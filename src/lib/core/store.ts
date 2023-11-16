import type { HeightT, Toast, ToastOptions } from './types';

import { get, writable } from 'svelte/store';
import { TIME_BEFORE_UNMOUNT, TOAST_LIMIT } from './constants';

export function createToastsStore(toastOptions?: ToastOptions) {
	toastOptions;
	const toasts = writable<Toast[]>([]);
	const pausedAt = writable<number | null>(null);
	const toastTimeouts = new Map<Toast['id'], ReturnType<typeof setTimeout>>();

	const add = (toast: Toast) => {
		toasts.update(($toasts) => [toast, ...$toasts].slice(0, TOAST_LIMIT));
	};

	const update = (toast: Partial<Toast> & { id: string }) => {
		clearFromRemoveQueue(toast.id);
		toasts.update(($toats) =>
			$toats.map((t) => (t.id === toast.id ? { ...t, ...toast, id: t.id } : t))
		);
	};

	const upsert = (toast: Toast) => {
		const existingToast = get(toasts).find(({ id }) => id === toast.id);
		if (existingToast) update(toast);
		else add(toast);
	};

	const dismiss = (toastId?: string) => {
		toasts.update(($toasts) => {
			// if (toastId) addToRemoveQueue(toastId);
			// else $toasts.forEach((toast) => addToRemoveQueue(toast.id));
			return $toasts.map((t) =>
				t.id === toastId || toastId === undefined ? { ...t, delete: true } : t
			);
		});
	};

	const remove = (toastId?: string) => {
		toasts.update(($toasts) => {
			if (!toastId) return [];
			return $toasts.filter((t) => t.id !== toastId);
		});
	};

	const addToRemoveQueue = (toastId: string, removeAfterMs = TIME_BEFORE_UNMOUNT) => {
		if (toastTimeouts.has(toastId)) return;

		const timeout = setTimeout(() => {
			toastTimeouts.delete(toastId);
			remove(toastId);
		}, removeAfterMs);

		toastTimeouts.set(toastId, timeout);
	};

	const clearFromRemoveQueue = (toastId: string) => {
		const timeout = toastTimeouts.get(toastId);
		if (timeout) clearTimeout(timeout);
	};

	const startPause = (time = Date.now()) => pausedAt.set(time);

	const endPause = (time = Date.now()) => {
		let diff: number;

		pausedAt.update(($pausedAt) => {
			diff = time - ($pausedAt || 0);
			return null;
		});

		toasts.update(($toasts) =>
			$toasts.map((t) => ({
				...t,
				pauseDuration: t.pauseDuration + diff
			}))
		);
	};

	return {
		subscribe: toasts.subscribe,
		pausedAt: { subscribe: pausedAt.subscribe },
		add: upsert,
		update,
		remove,
		addToRemoveQueue,
		dismiss,
		startPause,
		endPause
	};
}

export const toasts = createToastsStore();
export const heights = writable<HeightT[]>([]);
