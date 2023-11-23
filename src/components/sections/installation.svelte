<script lang="ts">
	import { copy } from '@svelte-put/copy';
	import { crossfade } from 'svelte/transition';
	import { circOut } from 'svelte/easing';

	import CopyButton from '@/components/copy-button.svelte';
	import { Npm, Pnpm, Yarn } from '@/components/icons';

	let trigger: HTMLElement;
	let copied = false;

	const installers = [
		{ name: 'npm', command: 'npm install sonner-svelte', icon: Npm },
		{ name: 'pnpm', command: 'pnpm add sonner-svelte', icon: Pnpm },
		{ name: 'yarn', command: 'yarn add sonner-svelte', icon: Yarn }
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
		<h2>Installation</h2>
		<div class="switcher" role="tablist">
			{#each installers as installer (installer.name)}
				{@const isActive = installer.name === currentInstaller.name}

				<button
					type="button"
					role="tab"
					aria-label={installer.name}
					aria-selected={isActive}
					data-active={isActive || undefined}
					on:click={() => (currentInstaller = installer)}
				>
					{#if isActive}
						<div
							class="switcher__indicator"
							in:send={{ key: 'active' }}
							out:receive={{ key: 'active' }}
						/>
					{/if}
					<svelte:component this={installer.icon} width="12" height="12" />
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

		& button {
			position: relative;
			display: inline-flex;
			align-items: center;
			gap: 4px;
			padding: 8px;
			color: var(--gray12);
			cursor: pointer;

			& svg {
				transition: opacity 180ms ease-out;
				opacity: 0.3;
			}

			& .switcher__indicator {
				position: absolute;
				inset: 0px;
				background: var(--gray4);
				border-radius: var(--radius);
				z-index: -1;
			}

			&:focus {
				outline: none;
			}

			&:focus-visible {
				box-shadow: 0 0 0 2px var(--gray8);
			}

			&[data-active] {
				& svg {
					opacity: 1;
				}
			}
		}
	}

	.code__wrapper {
		position: relative;
		display: flex;
		align-items: center;
		height: 40px;
		padding: 0 12px;
		margin-top: 12px;
		border-radius: var(--radius);
		background: var(--gray1);
		border: 1px solid var(--gray5);
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
