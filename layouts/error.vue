<template>
	<div class="container text-center">
		<div v-if="statusCode === 404" class="mb-24">
			<img v-lazy-load data-src="~assets/img/404.png" alt="" />
			<p class="h2 text-primary">
				Maaf, halaman yang kamu cari untuk saat ini sedang tidak tersedia.
			</p>
		</div>
		<div v-else class="mb-24">
			<img v-lazy-load data-src="~assets/img/500.png" alt="" />
			<p class="h2 text-primary">
				Maaf, saat ini sedang terjadi kesalahan basis data.
			</p>
		</div>
		<a class="btn--primary" href="/">Return to Home</a>
	</div>
</template>

<script>
export default {
	layout: 'blanklayout',
	props: {
		error: {
			type: Object,
			default: null
		}
	},
	head() {
		return {
			title: this.error.statusCode
		}
	},
	computed: {
		statusCode() {
			return (this.error && this.error.statusCode) || 500
		},
		message() {
			return this.error.message
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	padding: 60px 0;
	max-width: 590px !important;
}
</style>
