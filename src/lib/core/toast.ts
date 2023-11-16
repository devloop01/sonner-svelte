import type { DefaultToastOptions, Renderable, Toast, ToastType, ValueOrFunction } from './types';
import { toasts } from './store';
import { genId, resolveValue } from './utils';
import { TOAST_LIFETIME } from './constants';

type Message = Renderable;

type ToastHandler = (message: Message, options?: DefaultToastOptions) => string;

const createToast = (message: Message, type?: ToastType, opts?: DefaultToastOptions): Toast => ({
	...opts,
	type,
	title: message,
	dismissible: opts?.dismissible || true,
	id: opts?.id || genId(),
	createdAt: Date.now(),
	pauseDuration: TOAST_LIFETIME
});

const createHandler =
	(type?: ToastType): ToastHandler =>
	(message, options) => {
		const toast = createToast(message, type, options);
		toasts.add(toast);
		return toast.id;
	};

const toast = (message: string, opts?: DefaultToastOptions) => createHandler()(message, opts);

toast.message = createHandler();
toast.success = createHandler('success');
toast.info = createHandler('info');
toast.warning = createHandler('warning');
toast.error = createHandler('error');
toast.loading = createHandler('loading');

toast.custom = createHandler();

toast.dismiss = (toastId?: string) => {
	toasts.dismiss(toastId);
};

toast.remove = (toastId?: string) => toasts.remove(toastId);

toast.promise = <T>(
	promise: Promise<T>,
	msgs: {
		loading: Renderable;
		success: ValueOrFunction<Renderable, T>;
		error: ValueOrFunction<Renderable, unknown>;
	},
	opts?: DefaultToastOptions
) => {
	const id = toast.loading(msgs.loading, { ...opts, ...opts?.loading });

	promise
		.then((p) => {
			toast.success(resolveValue(msgs.success, p), {
				id,
				...opts,
				...opts?.success
			});
			return p;
		})
		.catch((e) => {
			toast.error(resolveValue(msgs.error, e), {
				id,
				...opts,
				...opts?.error
			});
		});

	return promise;
};

// toast.loading =  createHandler('')

export { toast };
