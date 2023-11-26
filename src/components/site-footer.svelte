<footer>
	<span class="footer--text">
		Made by <a href="https://x.com/emilkowalski_" target="_blank">
			<img src="emil.jpeg" alt="Avatar of Emil" />
			Emil
		</a>
	</span>

	<span class="footer--text">
		Ported to svelte by <a href="https://x.com/devloop01" target="_blank">
			<img src="sikriti.png" alt="Avatar of Sikriti" />
			Sikriti
		</a>
	</span>
</footer>

<style>
	img {
		width: 20px;
		height: 20px;
		border-radius: 50%;
	}

	footer {
		padding: 32px 0;
		border-top: 1px solid var(--gray5);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.footer--text {
		font-size: 14px;
		display: flex;
		align-items: center;
		gap: 4px;
		color: var(--gray12);
	}

	.footer--text a {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-weight: 600;
		padding: 4px 6px;
		border-radius: var(--radius);
		transition: 0.2s ease;
		transition-property: background;
		color: var(--gray12);
	}

	.footer--text a:hover,
	.footer--text a:focus-visible {
		outline: none;
		background: var(--gray3);
	}
</style>
