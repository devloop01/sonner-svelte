// original: https://github.com/romkor/svelte-portal/blob/master/src/Portal.svelte
// modified: https://github.com/melt-ui/melt-ui/blob/ce5054a90eabd06dc3f964a15dbc571905d9cc1e/src/lib/internal/actions/portal.ts

import { tick } from 'svelte';
import type { Action } from 'svelte/action';
import { isHTMLElement, noop } from '../utils.js';

export type PortalConfig = undefined | string | HTMLElement;

export const portal: Action<HTMLElement, PortalConfig> = (el, target = 'body') => {
	let targetEl;

	if (!isHTMLElement(target) && typeof target !== 'string') {
		return { destroy: noop };
	}

	async function update(newTarget: HTMLElement | string | undefined) {
		target = newTarget;

		if (typeof target === 'string') {
			targetEl = document.querySelector(target);
			if (targetEl === null) {
				await tick();
				targetEl = document.querySelector(target);
			}
			if (targetEl === null) {
				throw new Error(`No element found matching css selector: "${target}"`);
			}
		} else if (isHTMLElement(target)) {
			targetEl = target;
		} else {
			throw new TypeError(
				`Unknown portal target type: ${
					target === null ? 'null' : typeof target
				}. Allowed types: string (CSS selector) or HTMLElement.`
			);
		}

		el.dataset.portal = '';
		targetEl.appendChild(el);
		el.hidden = false;
	}

	function destroy() {
		el.remove();
	}

	update(target);

	return { update, destroy };
};
