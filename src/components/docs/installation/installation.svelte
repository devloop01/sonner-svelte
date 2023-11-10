<script lang="ts">
	import { copy } from '@svelte-put/copy';
	import { crossfade } from 'svelte/transition';
	import { circOut } from 'svelte/easing';

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
		duration: 200,
		easing: circOut
	});

	function handleCopied() {
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<section>
	<div>
		<h3>Installation</h3>
		<div class="switcher">
			{#each installers as installer (installer.name)}
				{@const isActive = installer.name === currentInstaller.name}

				<button on:click={() => (currentInstaller = installer)}>
					{#if isActive}
						<div
							class="switcher__indicator"
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
		<code use:copy={{ trigger }} on:copied={handleCopied}>
			{currentInstaller.command}
		</code>
		<CopyButton {copied} text={currentInstaller.command} />
	</div>
</section>

<style lang="postcss">
	section > div:not(.code__wrapper) {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.switcher {
		position: relative;
		display: flex;
		align-items: center;
		border-radius: var(--radius);
		border: 1px solid var(--gray6);

		& button {
			position: relative;
			padding: 2px 8px;
			border-radius: var(--radius);
			color: var(--gray12);
			font-size: 14px;
			cursor: pointer;
			transition-property: background, color;
			transition-duration: 220ms;
			transition-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);

			& .switcher__indicator {
				position: absolute;
				inset: 0;
				background: var(--gray3);
				border-radius: var(--radius);
				z-index: -1;
			}

			&:focus {
				outline: none;
			}

			&:focus-visible {
				box-shadow: 0 0 0 2px var(--gray8);
			}
		}
	}

	.code__wrapper {
		position: relative;
		display: flex;
		align-items: center;
		height: 40px;
		padding: 0 12px;
		margin-top: 8px;
		border-radius: var(--radius);
		background: var(--gray2);
		border: 1px solid var(--gray6);
		cursor: copy;

		& code {
			font-family: var(--font-mono);
			font-size: 14px;
		}

		& button {
			position: absolute;
			top: 50%;
			right: 8px;
			transform: translateY(-50%);
		}
	}
</style>
