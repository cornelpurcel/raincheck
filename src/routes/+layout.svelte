<div class="main">
	<slot />
</div>

<footer>
	<span class="footer-text">raincheck 2023</span>
</footer>

<style>
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	footer {
		position: fixed;
		bottom: 0;
		background-color: rgba(255, 228, 196, 0.15);
		width: 100%;
		display: block;
		left: 0;
		text-align: right;
		border-top: 1px rgba(77, 77, 77, 0.2) solid;
	}

	.footer-text {
		margin-right: 25rem;
	}
</style>
