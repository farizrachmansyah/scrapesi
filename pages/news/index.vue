<template>
	<main class="site-main">
		<div class="container">
			<h1>News</h1>
			<div v-if="$fetchState.pending" class="text-center p-24">
				<span class="spinner"></span>
			</div>
			<div v-else class="bzg">
				<div v-for="(item, i) in news" :key="i" class="bzg_c" data-col="m6, l3">
					<card :card-data="item" path="/news/" />
				</div>
			</div>
		</div>
	</main>
</template>

<script>
export default {
	components: {
		card: () => import('~/components/news/card')
	},
	data() {
		return {
			news: []
		}
	},
	async fetch() {
		await this.updateData()
	},
	fetchOnServer: false,
	head() {
		return {
			...this.$SEOMeta({
				metaTitle: 'News'
			})
		}
	},
	methods: {
		updateData() {
			this.$axios
				.get('/base/ideas', {
					params: {
						'page[number]': this.currentPage,
						'page[size]': 10,
						append: 'small_image,medium_image'
					}
				})
				.then(res => {
					this.news = res.data.data
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
}
</script>

<style lang="scss" scoped></style>
