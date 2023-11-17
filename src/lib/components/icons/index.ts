import type { ToastType } from '$lib/core/types.js';

import ErrorIcon from './error.svelte';
import InfoIcon from './info.svelte';
import WarningIcon from './warning.svelte';
import SuccessIcon from './success.svelte';
import LoaderIcon from './loader.svelte';

export const getIcon = (type?: ToastType) => {
	switch (type) {
		case 'success':
			return SuccessIcon;
		case 'info':
			return InfoIcon;
		case 'warning':
			return WarningIcon;
		case 'error':
			return ErrorIcon;
		default:
			return null;
	}
};

export { ErrorIcon, InfoIcon, WarningIcon, SuccessIcon, LoaderIcon };
