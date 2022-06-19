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
						v-for="(data, index) in jobsPerPage"
						:key="index"
						class="bzg_c"
						data-col="s6m4"
					>
						<JobCard :card-data="data" />
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
// import { mapState } from 'vuex'
import JobResult from '~/components/job/JobResults.vue'
import JobCard from '~/components/job/JobCard.vue'
import HistoryCard from '~/components/job/HistoryCard.vue'

export default {
	components: {
		JobResult,
		JobCard,
		HistoryCard
	},
	async asyncData({ store, route }) {
		const objParam = {
			q: route.query.q,
			loc: route.query.loc
		}

		const getJobs = store.getters['job/getJobs']
		let jobs = getJobs()

		if (!jobs.length) {
			jobs = await store.dispatch('job/getJobs', objParam)
		}

		return {
			jobs
		}
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
		},
		page() {
			return parseInt(this.$route.query.page) || 1
		},
		jobsPerPage() {
			return this.jobs[this.page - 1]
		}
	},
	// watch: {
	// 	page() {
	// 		console.log(this.page)
	// 	}
	// },
	watchQuery: ['q', 'loc'],
	created() {
		// handle kalo jobsnya gadapet dari asyncData, ambil dari vuex
		if (!this.jobs || !this.jobs.length) {
			this.jobs = this.$store.state.job.jobs
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

			if (tab === 'result') {
				delete currQuery.tab
				this.$router.push({
					query: {
						...currQuery,
						tab,
						page: 1
					}
				})
			} else {
				delete currQuery.tab
				delete currQuery.page
				this.$router.push({
					query: {
						...currQuery,
						tab
					}
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.site-main {
	display: flex;
	flex-direction: column;
	height: calc(100% - 70px);
}

.tab-active {
	border-bottom: 1px solid $primary;
}

.result-component {
	position: sticky;
	bottom: 0;
	margin-top: auto;
}
</style>
