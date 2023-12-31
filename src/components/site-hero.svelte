<script>
	import { page } from '$app/stores';
	import { Star, Logo, ExternalLink } from '@/components/icons';

	import { toast } from '$lib';
</script>

<div class="wrapper">
	<div class="toastWrapper">
		<div class="toast" />
		<div class="toast" />
		<div class="toast" />
	</div>

	<h1 class="heading">
		<span class="sr-only">sonner-svelte</span>
		<Logo aria-label="sonner-svelte" fill="var(--gray12)" />
	</h1>

	<p>An opinionated toast component for svelte</p>

	<div class="buttons">
		<button
			data-primary
			class="button"
			on:click={() => toast.message('Hello from toast!', { description: 'This is a description!' })}
		>
			<svelte:component this={Star} width="14" height="14" />
			<span>Render Toast</span>
		</button>
		<a class="button" href="https://github.com/devloop01/sonner-svelte" target="_blank">Github</a>
	</div>

	<div class="badges">
		<span class="badge">
			<a href="https://www.npmjs.com/package/sonner-svelte" target="_blank">
				v{$page.data.version}
			</a>
			<ExternalLink width={12} height={12} />
		</span>
		<span class="badge">
			<a href="https://sonner.emilkowal.ski/" target="_blank">ported</a>
			<ExternalLink width={12} height={12} />
		</span>
	</div>
</div>

<style lang="postcss">
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.toastWrapper {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		height: 100px;
		width: 400px;
		position: relative;
		mask-image: linear-gradient(to top, transparent 0%, black 35%);
		opacity: 1;
	}

	.toast {
		width: 356px;
		height: 40px;
		background: var(--gray0);
		box-shadow: 0 4px 12px #0000001a;
		border: 1px solid var(--gray3);
		border-radius: var(--radius);
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	.toast:nth-child(1) {
		transform: translateY(-60%) translateX(-50%) scale(0.9);
	}

	.toast:nth-child(2) {
		transform: translateY(-30%) translateX(-50%) scale(0.95);
	}

	.buttons {
		display: flex;
		gap: 12px;
		margin: 22px 0;
	}

	.button {
		height: 40px;
		border-radius: var(--radius);
		border: 1px solid var(--gray5);
		background: linear-gradient(156deg, rgba(255, 255, 255, 1) 0%, rgba(240, 240, 240, 1) 100%);
		padding: 0 30px;
		font-weight: 600;
		flex-shrink: 0;
		font-family: inherit;
		box-shadow:
			0px 0px 0px 1px rgba(0, 0, 0, 0.06),
			0px 1px 0px 0px rgba(0, 0, 0, 0.08),
			0px 2px 2px 0px rgba(0, 0, 0, 0.04),
			0px 3px 3px 0px rgba(0, 0, 0, 0.02),
			0px 4px 4px 0px rgba(0, 0, 0, 0.01);
		position: relative;
		overflow: hidden;
		cursor: pointer;
		text-decoration: none;
		color: var(--gray12);
		font-size: 13px;
		display: inline-flex;
		align-items: center;
		gap: 4px;
		justify-content: center;
		transition:
			box-shadow 200ms,
			background 200ms;
		width: 164px;
	}

	.button[data-primary] {
		border: 1px solid var(--gray5);
		background: var(--gray12);
		color: var(--gray0);
	}
	.button:focus-visible {
		outline: none;
		box-shadow:
			0px 0px 0px 1px rgba(0, 0, 0, 0.06),
			0px 1px 0px 0px rgba(0, 0, 0, 0.08),
			0px 2px 2px 0px rgba(0, 0, 0, 0.04),
			0px 3px 3px 0px rgba(0, 0, 0, 0.02),
			0px 4px 4px 0px rgba(0, 0, 0, 0.01),
			0 0 0 2px rgba(0, 0, 0, 0.15);
	}

	.button::after {
		content: '';
		position: absolute;
		top: 100%;
		background: blue;
		left: 0;
		width: 100%;
		height: 35%;
		background: linear-gradient(
			to top,
			hsl(0, 0%, 91%) 0%,
			hsla(0, 0%, 91%, 0.987) 8.1%,
			hsla(0, 0%, 91%, 0.951) 15.5%,
			hsla(0, 0%, 91%, 0.896) 22.5%,
			hsla(0, 0%, 91%, 0.825) 29%,
			hsla(0, 0%, 91%, 0.741) 35.3%,
			hsla(0, 0%, 91%, 0.648) 41.2%,
			hsla(0, 0%, 91%, 0.55) 47.1%,
			hsla(0, 0%, 91%, 0.45) 52.9%,
			hsla(0, 0%, 91%, 0.352) 58.8%,
			hsla(0, 0%, 91%, 0.259) 64.7%,
			hsla(0, 0%, 91%, 0.175) 71%,
			hsla(0, 0%, 91%, 0.104) 77.5%,
			hsla(0, 0%, 91%, 0.049) 84.5%,
			hsla(0, 0%, 91%, 0.013) 91.9%,
			hsla(0, 0%, 91%, 0) 100%
		);
		opacity: 0.6;
		transition: transform 200ms;
	}

	.button:hover:not([data-primary]):after {
		transform: translateY(-100%);
	}

	.button[data-primary]:hover {
		background: rgb(52, 52, 52);
	}

	:global(.dark) .button {
		&[data-primary]:hover {
			background: rgb(200, 200, 200);
		}

		&:not([data-primary]) {
			background: linear-gradient(156deg, rgba(10, 10, 10, 1) 0%, rgba(30, 30, 30, 1) 100%);
			box-shadow:
				0px 0px 0px 1px rgba(255, 255, 255, 0.06),
				0px 1px 0px 0px rgba(255, 255, 255, 0.08),
				0px 2px 2px 0px rgba(255, 255, 255, 0.04),
				0px 3px 3px 0px rgba(255, 255, 255, 0.02),
				0px 4px 4px 0px rgba(255, 255, 255, 0.01);
		}

		&:not([data-primary])::after {
			background: linear-gradient(
				to top,
				hsl(0, 0%, 15%) 0%,
				hsla(0, 0%, 15%, 0.987) 8.1%,
				hsla(0, 0%, 15%, 0.951) 15.5%,
				hsla(0, 0%, 15%, 0.896) 22.5%,
				hsla(0, 0%, 15%, 0.825) 29%,
				hsla(0, 0%, 15%, 0.741) 35.3%,
				hsla(0, 0%, 15%, 0.648) 41.2%,
				hsla(0, 0%, 15%, 0.55) 47.1%,
				hsla(0, 0%, 15%, 0.45) 52.9%,
				hsla(0, 0%, 15%, 0.352) 58.8%,
				hsla(0, 0%, 15%, 0.259) 64.7%,
				hsla(0, 0%, 15%, 0.175) 71%,
				hsla(0, 0%, 15%, 0.104) 77.5%,
				hsla(0, 0%, 15%, 0.049) 84.5%,
				hsla(0, 0%, 15%, 0.013) 91.9%,
				hsla(0, 0%, 15%, 0) 100%
			);
		}
	}

	.heading {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: -12px 0 20px;
		& > svg {
			height: 62px;
		}
	}

	/* .badges {
		margin: 8px 0;
	} */

	.badge {
		color: var(--gray11);
		font-weight: 500;
		font-size: 13px;
		border: 1px solid var(--gray5);
		border-radius: 20px;
		padding: 3px 12px;
		transition: background 200ms ease;
		display: inline-flex;
		align-items: center;
		/* justify-content: center; */
		cursor: pointer;
		gap: 0px;
		transition: 300ms cubic-bezier(0.785, 0.135, 0.15, 0.86);
		transition-property: gap;

		& > svg {
			width: 0;
			scale: 0;
			opacity: 0;
			transition: 300ms cubic-bezier(0.785, 0.135, 0.15, 0.86);
			transition-property: width, scale, opacity, margin;
			transition-delay: 40ms;
			transform-origin: top;
		}

		&:hover {
			background: var(--gray2);
			gap: 6px;
			transition-delay: 0ms;

			& > svg {
				width: 12px;
				opacity: 1;
				scale: 1;
				transform-origin: bottom;
				transition-delay: 0ms;
			}
		}
	}

	@media (max-width: 420px) {
		.toastWrapper {
			width: 100%;
		}

		.buttons {
			flex-direction: column;
		}
	}
</style>
