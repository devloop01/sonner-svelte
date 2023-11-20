import type { LayoutLoad } from './$types';
import packageJSON from '../../package.json';

export const load = (async () => {
	return {
		version: packageJSON.version
	};
}) satisfies LayoutLoad;
