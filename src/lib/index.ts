import { toast } from './internal/toast.js';
import Toaster from './components/toaster.svelte';

export type { ToastType, ToastPosition, Toast } from './internal/types.js';
export { toast, Toaster };
export default toast;
