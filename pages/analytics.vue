<template>
	<main :class="{ fetching: $fetchState.pending }" class="site-main">
		<div class="container">
			<div v-if="$fetchState.pending" class="spinner-wrapper fetching p-24">
				<span class="spinner"></span>
			</div>
			<div v-else class="pv-24">
				<div class="bzg">
					<div
						v-for="(item, i) in analytics"
						:key="`analytics-${i}`"
						class="bzg_c"
						:data-col="i === 0 ? 's12' : 'm6l4'"
					>
						<Card :card-data="item" :slug="i" />
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import Card from '~/components/analytics/Card.vue'

/* eslint-disable no-console */
export default {
	components: {
		Card
	},
	data() {
		return {
			analytics: []
		}
	},
	async fetch() {
		await this.getData()
	},
	head() {
		return {
			...this.$SEOMeta({
				metaTitle: 'Analytics'
			})
		}
	},
	methods: {
		async getData() {
			const API_TOKEN =
				'GMM0tkDJqJsOESZoG4eRfaMVmeo8NZLqazPB0Fw2vTKt2qthaNGkkJVCyNlT'

			await this.$axios
				.get('api/scraping-jobs/', {
					params: {
						api_token: API_TOKEN
					}
				})
				.then(async res => {
					if (res.status === 200) {
						const resData = res.data.data
						const JOBS_ID = resData[resData.length - 1].id

						await this.$axios
							.get(`api/scraping-job/${JOBS_ID}/json`, {
								params: {
									api_token: API_TOKEN
								}
							})
							.then(res => {
								if (res.status === 200) {
									const resArr = res.data.split('\n')
									if (resArr.length > 1) {
										// buang yang paling terakhir karna string kosong
										resArr.pop()
										resArr.forEach(item => {
											this.analytics.push(JSON.parse(item))
										})
									}
								}
							})
							.catch(err => {
								console.error(err)
							})
					}
				})
				.catch(err => {
					console.error(err)
				})
		}
		// async updateData() {
		// 	this.isUpdateData = true
		// 	const API_KEY = '7e9507038e2e450a9749d80784a468bc'
		// 	const API_PARAM_DOMAINS = [
		// 		'techcrunch.com',
		// 		// 'thenextweb.com',
		// 		'bloomberg.com'
		// 		// 'nytimes.com'
		// 	]
		// 	const API_PARAM_QUERY = this.tabActive
		// 	await this.$axios
		// 		.get('api/v2/everything', {
		// 			params: {
		// 				q: API_PARAM_QUERY,
		// 				domains: API_PARAM_DOMAINS.toString(),
		// 				apiKey: API_KEY
		// 			}
		// 		})
		// 		.then(res => {
		// 			if (res.status === 200) {
		// 				this.news = res.data.articles
		// 				this.news.forEach(data => {
		// 					if (!data.urlToImage) {
		// 						data.urlToImage = 'https://via.placeholder.com/300'
		// 					}
		// 				})
		// 			}
		// 			this.isUpdateData = false
		// 		})
		// 		.catch(err => {
		// 			this.isUpdateData = false
		// 			// eslint-disable-next-line no-console
		// 			console.log(err)
		// 		})
		// }
	}
}
</script>

<style lang="scss" scoped>
.site-main.fetching {
	height: calc(100% - 70px);
}
.spinner-wrapper.fetching {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.bzg_c {
	@media #{$medium} {
		padding-left: 32px;
		margin-bottom: 32px;
	}
}
</style>
