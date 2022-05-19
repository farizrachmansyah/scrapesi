<template>
	<main>
		<section class="container">
			<div class="pv-24">
				<button class="btn--primary">Results</button>
				<button class="btn--transparent">History</button>
			</div>
		</section>
		<section class="container">
			<div class="pv-24">
				<!-- <span>Your scraped job's data will appear here.</span> -->
			</div>
		</section>
		<section class="wrapper">
			<div class="container pv-36">
				<h4 class="text-cap mb-24">download scraped data</h4>
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
	</main>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.wrapper {
	background: $white;
}

.btn--transparent {
	&:hover {
		background: transparent;
		text-shadow: none;
		color: $primary;
	}
}
</style>
