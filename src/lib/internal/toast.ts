import type {
	DefaultToastOptions,
	PromiseToastOptions,
	PromiseT,
	Renderable,
	Toast,
	ToastType
} from './types.js';
import { dismissToast, upsertToast, removeToast } from './store.js';
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

const toast = (message: Message, opts?: DefaultToastOptions) => createHandler()(message, opts);

toast.message = createHandler();
toast.info = createHandler('info');
toast.warning = createHandler('warning');
toast.loading = createHandler('loading');
toast.success = createHandler('success');
toast.error = createHandler('error');
toast.custom = createHandler();

toast.dismiss = (toastId?: string) => dismissToast(toastId);
toast.remove = (toastId?: string) => removeToast(toastId);

toast.promise = <T>(promise: PromiseT<T>, opts?: PromiseToastOptions<T>) => {
	if (!opts) return;

	const id = toast.loading(opts.loading, { ...opts, promise });
	const p = resolveValue(promise, undefined);

	p.then((res) => {
		toast.success(resolveValue(opts.success, res), { id, ...opts });
		return res;
	}).catch((e) => {
		toast.error(resolveValue(opts.error, e), { id, ...opts });
	});

	return promise;
};

export { toast };
