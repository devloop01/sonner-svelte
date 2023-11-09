<script lang="ts">
	import { Button, buttonVariants } from '@/components/ui/button';
</script>

<div class="space-y-4">
	<h1 class="text-center text-5xl font-bold">sonner-svelte</h1>

	<div>
		<p class="text-center">An opinionated toast component</p>
		<p class="text-center">
			ported from
			<a class="font-semibold hover:underline" href="https://sonner.emilkowal.ski/" target="_blank"
				>Sonner</a
			>
		</p>
	</div>
	<div class="flex gap-2 flex-wrap justify-center">
		<Button intent="primary" size="lg" class="w-40">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="white"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path
					d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
				/>
				<path d="M5 3v4" />
				<path d="M19 17v4" />
				<path d="M3 5h4" />
				<path d="M17 19h4" />
			</svg>
			<span>Render Toast</span>
		</Button>
		<a
			class={buttonVariants({ intent: 'secondary', size: 'lg', class: 'w-40' })}
			href="https://github.com/devloop01/sonner-svelte"
			target="_blank">Github</a
		>
	</div>
</div>
