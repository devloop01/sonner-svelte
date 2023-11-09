<script lang="ts">
	import { copy } from '@svelte-put/copy';
	import { crossfade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	import { CopyButton } from '@/components/copy-button';

	let trigger: HTMLElement;
	let copied = false;

	const installers = [
		{ name: 'npm', command: 'npm install sonner-svelte' },
		{ name: 'pnpm', command: 'pnpm add sonner-svelte' },
		{ name: 'yarn', command: 'yarn add sonner-svelte' }
	];

	let currentInstaller = installers[0];

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});

	function handleCopied() {
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="space-y-2">
	<div class="flex justify-between">
		<h3 class="font-semibold text-xl">Installation</h3>
		<div class="flex items-center gap-2">
			{#each installers as installer (installer.name)}
				{@const isActive = installer.name === currentInstaller.name}
				<button
					data-active={isActive || undefined}
					class="relative px-2 py-1 rounded-md text-sm border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/40"
					on:click={() => (currentInstaller = installer)}
				>
					{#if isActive}
						<div
							class="absolute inset-0 rounded-md bg-black/10"
							in:send={{ key: 'active' }}
							out:receive={{ key: 'active' }}
						/>
					{/if}
					<span>{installer.name}</span>
				</button>
			{/each}
		</div>
	</div>

	<div class="code__wrapper" bind:this={trigger}>
		<code class="code" use:copy={{ trigger }} on:copied={handleCopied}>
			{currentInstaller.command}
		</code>
		<CopyButton
			{copied}
			text={currentInstaller.command}
			class="absolute top-1/2 right-2 -translate-y-1/2"
		/>
	</div>
</div>

<style lang="postcss">
	.code__wrapper {
		padding: 0 62px 0 12px;
		border-radius: 6px;
		background: theme(colors.gray.50);
		position: relative;
		height: 40px;
		border: 1px solid theme(colors.gray.200);
		display: flex;
		align-items: center;
		cursor: copy;
	}

	.code__wrapper .code {
		font-family: theme(fontFamily.mono);
		font-size: 14px;
	}
</style>
