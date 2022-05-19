<template>
	<main class="site-main">
		<div class="container pv-48 ph-24">
			<section class="info">
				<h4 class="title text-caps f-16">
					a free automated job vacancies scraping converter tools
				</h4>
				<h1 class="subtitle text-cap">
					collect targeted job vacancies and convert them into spreadsheet
					documents easily
				</h1>
			</section>
		</div>
	</main>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.info {
	width: 65%;
	margin: 0 auto;

	& > * {
		text-align: center;
	}

	.title {
		color: $thirdty;
	}
	.subtitle {
		line-height: 1.2;
		color: $black;
		font-family: $font_sec_serif;
		font-weight: 800;
	}
}
</style>
