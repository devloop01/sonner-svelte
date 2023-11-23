import { toast } from './internal/toast.js';
import Toaster from './components/toaster.svelte';

export default toast;
export { toast, Toaster };
export type {
	ToastType,
	ToastPosition,
	ToastOptions as Toast,
	Theme as ToastTheme,
	Direction as ToastDirection
} from './internal/types.js';
