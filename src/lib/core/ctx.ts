import type { ToasterContext } from './types';

import { getContext, setContext } from 'svelte';

const NAME = Symbol('sonner-svelte');

const set = <T>(value: T) => setContext(NAME, value);

const get = <T extends ReturnType<typeof set>>() => getContext<T>(NAME);

export const ctx = { set, get };
