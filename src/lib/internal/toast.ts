import type {
	ToastOptions,
	PromiseToastOptions,
	PromiseT,
	Renderable,
	Toast,
	ToastType,
	RecordT,
	Component
} from './types.js';
import { dismissToast, upsertToast, removeToast } from './store.js';
import { genId, resolveValue } from './utils.js';
import { TOAST_LIFETIME } from './constants.js';

type Message<T extends RecordT = RecordT> = Renderable<T>;

type ToastHandler = <T extends RecordT = RecordT>(
	message: Message<T>,
	options?: ToastOptions<T>
) => string;

const createToast = <T extends RecordT = RecordT>(
	message: Message<T>,
	type?: ToastType,
	opts?: ToastOptions<T>
): Toast<T> => ({
	type,
	title: message,
	createdAt: Date.now(),
	pauseDuration: 0,
	timeout: null,
	closeDelay: TOAST_LIFETIME,
	dismissible: opts?.dismissible || true,
	...opts,
	id: opts?.id || genId()
});

const createHandler =
	(type?: ToastType): ToastHandler =>
	(message, options) => {
		const toast = createToast(message, type, options);
		upsertToast(toast);
		return toast.id;
	};

const toast = <T extends RecordT = RecordT>(message: Message<T>, opts?: ToastOptions<T>) =>
	createHandler()(message, opts);

toast.message = createHandler();
toast.info = createHandler('info');
toast.warning = createHandler('warning');
toast.loading = createHandler('loading');
toast.success = createHandler('success');
toast.error = createHandler('error');

toast.custom = <T extends RecordT = RecordT>(component: Component<T>, opts?: ToastOptions<T>) =>
	createHandler('custom')(component, { ...opts, component });

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
