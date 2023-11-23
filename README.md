<p align="center">
<a href="https://sonner-svelte.vercel.app">
<img src="./banner.png" alt="" />
</a>
</p>
<p align="center">
<a aria-label="Website" href="https://sonner-svelte.vercel.app">
<img src="https://img.shields.io/badge/website-ffffff?style=for-the-badge&logo=svelte" />
</a>
<a aria-label="License" href="https://github.com/devloop01/sonner-svelte/blob/main/LICENSE">
<img src="https://img.shields.io/npm/l/sonner-svelte?color=green&style=for-the-badge" />
</a>
<a aria-label="NPM version" href="https://npmjs.com/package/sonner-svelte">
<img src="https://img.shields.io/npm/v/sonner-svelte?color=ff3e00&style=for-the-badge" />
</a>
<a aria-label="NPM version" href="https://npmjs.com/package/sonner-svelte">
<img src="https://img.shields.io/npm/dt/sonner-svelte?color=ff3e00&style=for-the-badge" />
</a>
</p>

# sonner-svelte

> An opinionated toast notification library for Svelte.

`sonner-svelte` is a svelte port of Emil Kowalski's react library `sonner`

## Installation

```bash
# npm
npm install sonner-svelte
# pnpm
pnpm add sonner-svelte
# yarn
yarn add sonner-svelte
```

## Basic Usage

```svelte
<script>
 import { toast, Toaster } from 'sonner-svelte';
</script>

<Toaster />
<button on:click={() => toast('This is a toast message')}>Render toast</button>
```

For more examples, check out the [website](https://sonner-svelte.vercel.app)

## API

The api is similar to the react version, with a few differences

### Custom toast

In the react version, custom toast components are passed as `jsx` elements, but in svelte, we can't do that. So, we pass the component as a `SvelteComponent` instead. It maintains the default styling.

If you want to create unstyled toast you need to create headless toast.

```svelte
<!-- CustomToast.svelte -->
<script>
 export let message;
</script>

<p>This is a custom Component</p>
```

```svelte
<script>
 import { toast, Toaster } from 'sonner-svelte';
 import CustomToast from './CustomToast.svelte';
</script>

<Toaster />
<button on:click={() => toast(CustomToast)}>Render toast</button>
```

### Headless toast (unstyled)

Similarly, when you want to create a custom headless (unstyled) toast, you need to pass the component as a `SvelteComponent` instead of a `jsx` element and its corresponding props as an object.

```svelte
<!-- HeadlessToast.svelte -->
<script>
 import _toast from 'sonner-svelte';
 export let event;
 export let toast; 
 // toast is available when you pass a custom component. You don't need to pass it manually
</script>

<p>Created event: {event}!</p>
<button on:click={() => _toast.dismiss(toast.id)}> close </button>
```

```svelte
<script>
 import { toast, Toaster } from 'sonner-svelte';
 import HeadlessToast from './HeadlessToast.svelte';

 const handleClick = () => {
  toast.custom(HeadlessToast, { props: { event: 'Louvre Museum' } });
 };
</script>

<Toaster />
<button on:click={handleClick}>Render toast</button>
```

## Acknowledgements

Thanks to the original author [@emilkowalski](https://github.com/emilkowalski) for creating [sonner](https://github.com/emilkowalski/sonner)
