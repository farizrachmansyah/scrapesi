<template>
	<main class="site-main">
		<div class="container">
			<h1>Detail Service</h1>
      <nuxt-link to="/services">Services</nuxt-link>
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
				metaTitle: 'Detail Services'
			})
		}
	}
}
</script>

<style lang="scss" scoped></style>
