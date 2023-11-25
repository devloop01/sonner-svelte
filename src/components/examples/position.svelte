<script lang="ts">
	import CodeExample from '@/components/code-example.svelte';
	import { toast, type ToastPosition } from '$lib';

	const positions = [
		'top-left',
		'top-center',
		'top-right',
		'bottom-left',
		'bottom-center',
		'bottom-right'
	] as const;

	let activePosition: ToastPosition;
	export { activePosition as position };

	let examples = positions.map((position) => ({
		name: position,
		snippet: `<Toaster position="${position}" />`,
		action: () => {
			const toastsAmount = document.querySelectorAll('[data-sonner-sv-toast]').length;
			activePosition = position;
			// No need to show a toast when there is already one
			if (toastsAmount > 0 && position === activePosition) return;

			toast('Event has been created', {
				description: 'Monday, January 3rd at 6:00pm'
			});
		},
		active: position === activePosition
	}));
</script>

<section>
	<h2>Position</h2>
	<p>Swipe direction changes depending on the position.</p>

	<CodeExample {examples} />
</section>
