import type {
	DefaultToastOptions,
	Renderable,
	Toast,
	ToastType,
	ValueOrFunction
} from './types.js';
import { dismissToast, upsertToast, removeToast } from './store';
import { genId, resolveValue } from './utils.js';
import { TOAST_LIFETIME } from './constants.js';

type Message = Renderable;

type ToastHandler = (message: Message, options?: DefaultToastOptions) => string;

const createToast = (message: Message, type?: ToastType, opts?: DefaultToastOptions): Toast => ({
	...opts,
	type,
	title: message,
	dismissible: opts?.dismissible || true,
	id: opts?.id || genId(),
	createdAt: Date.now(),
	pauseDuration: 0,
	timeout: null,
	closeDelay: TOAST_LIFETIME
});

const createHandler =
	(type?: ToastType): ToastHandler =>
	(message, options) => {
		const toast = createToast(message, type, options);
		upsertToast(toast);
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
	dismissToast(toastId);
};

toast.remove = (toastId?: string) => removeToast(toastId);

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
