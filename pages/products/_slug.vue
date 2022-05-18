<template>
	<main class="site-main">
		<div class="container">
			<h1>Detail Products</h1>
      <nuxt-link to="/products">Products</nuxt-link>
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
				metaTitle: 'Products'
			})
		}
	}
}
</script>

<style lang="scss" scoped></style>
