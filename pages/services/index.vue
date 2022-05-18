<template>
	<main class="site-main">
		<div class="container">
			<h1>Services</h1>
      <nuxt-link to="/services/detail-service">Detail Services</nuxt-link>
		</div>
	</main>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	head() {
		return {
			...this.$SEOMeta({
				metaTitle: 'Services'
			})
		}
	}
}
</script>

<style lang="scss" scoped></style>
