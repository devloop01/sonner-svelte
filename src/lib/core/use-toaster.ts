import type { Toast, ToastOptions } from './types';
import { onDestroy } from 'svelte';
import { createToastsStore } from './store';
import { toast } from './toast';

export default function useToaster(toastOptions?: ToastOptions) {
	const toasts = createToastsStore(toastOptions);

	const timeouts = new Map<Toast['id'], ReturnType<typeof setTimeout>>();
	let _pausedAt: number | null;

	const unsubscribes = [
		toasts.pausedAt.subscribe(($pausedAt) => {
			if ($pausedAt) {
				for (const [, timeoutId] of timeouts) {
					clearTimeout(timeoutId);
				}
				timeouts.clear();
			}
			_pausedAt = $pausedAt;
		}),
		toasts.subscribe(($toasts) => {
			if (_pausedAt) {
				return;
			}

			const now = Date.now();
			for (const t of $toasts) {
				if (timeouts.has(t.id)) {
					continue;
				}
				if (t.duration === Infinity) {
					continue;
				}

				const durationLeft = (t.duration || 0) + t.pauseDuration - (now - t.createdAt);

				if (durationLeft < 0) {
					if (t.visible) {
						// FIXME: This causes a recursive cycle of updates.
						toast.dismiss(t.id);
					}
					return null;
				}
				timeouts.set(
					t.id,
					setTimeout(() => toast.dismiss(t.id), durationLeft)
				);
			}
		})
	];
	onDestroy(() => {
		for (const unsubscribe of unsubscribes) {
			unsubscribe();
		}
	});

	return {
		toasts,
		handlers: {
			startPause() {
				toasts.startPause();
			},
			endPause() {
				toasts.endPause();
			}
		}
	};
}
