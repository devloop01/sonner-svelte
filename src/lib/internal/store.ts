import type { HeightT, Toast } from './types.js';

import { get, writable } from 'svelte/store';
import { TIME_BEFORE_UNMOUNT, TOAST_LIMIT } from './constants.js';

export const toasts = writable<Toast[]>([]);
export const heights = writable<HeightT[]>([]);

const toastTimeouts = new Map<Toast['id'], ReturnType<typeof setTimeout>>();

export const addToast = (toast: Toast) => {
	toasts.update(($toasts) => [toast, ...$toasts].slice(0, TOAST_LIMIT));
};

export const updateToast = (toast: Partial<Toast> & { id: string }) => {
	clearToastFromRemoveQueue(toast.id);
	toasts.update(($toats) =>
		$toats.map((t) => (t.id === toast.id ? { ...t, ...toast, id: t.id } : t))
	);
};

export const upsertToast = (toast: Toast) => {
	const existingToast = get(toasts).find(({ id }) => id === toast.id);
	if (existingToast) updateToast(toast);
	else addToast(toast);
};

export const dismissToast = (toastId?: string) => {
	toasts.update(($toasts) => {
		if (toastId) addToastToRemoveQueue(toastId);
		else $toasts.forEach((toast) => addToastToRemoveQueue(toast.id));
		return $toasts.map((t) =>
			t.id === toastId || toastId === undefined ? { ...t, delete: true } : t
		);
	});
};

export const removeToast = (toastId?: string) => {
	toasts.update(($toasts) => {
		if (!toastId) return [];
		return $toasts.filter((t) => t.id !== toastId);
	});
};

export const addToastToRemoveQueue = (toastId: string, removeAfterMs = TIME_BEFORE_UNMOUNT) => {
	if (toastTimeouts.has(toastId)) return;

	const timeout = setTimeout(() => {
		toastTimeouts.delete(toastId);
		removeToast(toastId);
	}, removeAfterMs);

	toastTimeouts.set(toastId, timeout);
};

export const clearToastFromRemoveQueue = (toastId: string) => {
	const timeout = toastTimeouts.get(toastId);
	if (timeout) clearTimeout(timeout);
};
