<template>
	<main class="site-main"></main>
</template>

<script>
export default {
	head() {
		return {
			...this.$SEOMeta({
				metaTitle: 'Scrapesi'
			})
		}
	},
	beforeMount() {
		this.$router.push('job')
	}
}
</script>

<style lang="scss" scoped></style>
