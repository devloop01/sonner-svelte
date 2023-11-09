<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { type ButtonVariants, buttonVariants } from '.';

	type $$Props = HTMLButtonAttributes & {
		intent?: ButtonVariants['intent'];
		size?: ButtonVariants['size'];
	};

	let className: $$Props['class'] = undefined;
	export { className as class };
	export let intent: $$Props['intent'] = undefined;
	export let size: $$Props['size'] = undefined;
</script>

<button class={buttonVariants({ className, intent, size })} on:click {...$$restProps}>
	<slot />
</button>
