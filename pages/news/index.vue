<template>
	<main class="site-main">
		<div class="container">
			<div class="tab-nav pt-24 mb-24">
				<ul class="list-nostyle">
					<li>
						<button
							:class="{ 'tab-active': tabActive === 'business' }"
							class="btn-tab btn--transparent"
							@click="changeTab('business')"
						>
							Business
						</button>
					</li>
					<li>
						<button
							:class="{ 'tab-active': tabActive === 'technology' }"
							class="btn-tab btn--transparent"
							@click="changeTab('technology')"
						>
							Technology
						</button>
					</li>
					<li>
						<button
							:class="{ 'tab-active': tabActive === 'entertainment' }"
							class="btn-tab btn--transparent"
							@click="changeTab('entertainment')"
						>
							Entertainment
						</button>
					</li>
				</ul>
			</div>

			<div v-if="$fetchState.pending || isUpdateData" class="text-center p-24">
				<span class="spinner"></span>
			</div>
			<div v-else class="bzg">
				<div
					v-for="(item, i) in news"
					:key="`news-${i}`"
					class="bzg_c"
					:data-col="i === 0 ? 's12' : 'm6l4'"
				>
					<NewsCard :card-data="item" path="/news/" :slug="i" />
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import NewsCard from '~/components/news/NewsCard.vue'

export default {
	components: {
		NewsCard
	},
	data() {
		return {
			news: [],
			tabActive: 'business',
			isUpdateData: false
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
	watch: {
		tabActive() {
			this.updateData()
		}
	},
	methods: {
		async updateData() {
			this.isUpdateData = true
			const API_KEY = '7e9507038e2e450a9749d80784a468bc'
			const API_PARAM_DOMAINS = ['techcrunch.com', 'thenextweb.com']

			await this.$axios
				.get('api/v2/everything', {
					params: {
						domains: API_PARAM_DOMAINS.toString(),
						apiKey: API_KEY
					}
				})
				.then(res => {
					if (res.status === 200) {
						this.news = res.data.articles
					}
					this.isUpdateData = false
				})
				.catch(err => {
					this.isUpdateData = false
					// eslint-disable-next-line no-console
					console.log(err)
				})
		},
		changeTab(tab) {
			this.tabActive = tab
		}
	}
}
</script>

<style lang="scss" scoped>
.tab-nav {
	overflow-x: auto;
}

.btn-tab {
	font-weight: 400;

	&.tab-active {
		font-weight: 700;
	}
}

.bzg_c {
	@media #{$medium} {
		padding-left: 32px;
		margin-bottom: 32px;
	}
}
</style>
