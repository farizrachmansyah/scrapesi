<template>
	<section class="wrapper">
		<div class="container pv-36">
			<h4 class="text-caps mb-24">download scraped data</h4>
			<div class="flex v-end f-space-between">
				<div class="option-ext">
					<p class="mb-0">Download as</p>
					<span>select</span>
				</div>
				<div class="option-btn">
					<button class="btn--ghost-primary">Download This Page</button>
					<button class="btn--primary">Download All</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.wrapper {
	background: $white;
	border-top: 3px solid $primary;
	border-bottom: 3px solid $primary;
}

.btn--transparent {
	&:hover {
		background: transparent;
		text-shadow: none;
		color: $primary;
	}
}
</style>
