<script lang="ts">
	export let visible: boolean;

	let bars = Array(12).fill(0);
</script>

<div class="sonner-loading-wrapper" data-visible={visible}>
	<div class="sonner-spinner">
		{#each bars as _, i (`spinner-bar-${i}`)}
			<div class="sonner-loading-bar" />
		{/each}
	</div>
</div>
