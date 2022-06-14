<template>
	<main class="site-main">
		<section class="container">
			<div class="tab-nav pt-24">
				<ul class="list-nostyle">
					<li :class="{ 'tab-active': isResultTab }">
						<button class="btn--transparent" @click="changeTab('result')">
							Result
						</button>
					</li>
					<li :class="{ 'tab-active': !isResultTab }">
						<button class="btn--transparent" @click="changeTab('history')">
							History
						</button>
					</li>
				</ul>
			</div>
		</section>
		<section class="container">
			<div v-if="isResultTab" class="pv-24">
				<div class="bzg">
					<div
						v-for="(data, index) in scrapedData"
						:key="index"
						class="bzg_c"
						data-col="s6m4"
					>
						<JobCard />
					</div>
				</div>
			</div>
			<div v-else class="pv-24">
				<HistoryCard
					v-for="(data, i) in localHistory"
					:key="`hcard-${i}`"
					:card-data="data"
				/>
			</div>
		</section>
		<JobResult v-show="isResultTab" class="result-component" />
	</main>
</template>

<script>
import JobResult from '~/components/job/JobResults.vue'
import JobCard from '~/components/job/JobCard.vue'
import HistoryCard from '~/components/job/HistoryCard.vue'

export default {
	components: {
		JobResult,
		JobCard,
		HistoryCard
	},
	data() {
		return {
			scrapedData: 15
		}
	},
	computed: {
		isResultTab() {
			return this.$route.query.tab === 'result'
		},
		localHistory() {
			return this.$store.state.searchKeyData
		}
	},
	mounted() {
		// setup search key data in vuex
		if (localStorage.search !== undefined) {
			if (JSON.parse(localStorage.getItem('search')).length) {
				this.$store.commit(
					'SET_SEARCHKEY',
					JSON.parse(localStorage.getItem('search')).reverse()
				)
			}
		}
	},
	methods: {
		changeTab(tab) {
			const currQuery = this.$route.query
			delete currQuery.tab

			this.$router.push({
				query: {
					...currQuery,
					tab
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.site-main {
	height: calc(100% - 70px);
}

.tab-active {
	border-bottom: 1px solid $primary;
}

.result-component {
	position: sticky;
	bottom: 0;
	width: 100%;
}
</style>
