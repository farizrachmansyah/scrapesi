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
				<div class="bzg mb-48">
					<div
						v-for="(data, index) in jobsPerPage"
						:key="index"
						class="bzg_c"
						data-col="s6m4"
					>
						<JobCard :card-data="data" />
					</div>
				</div>
				<Pagination
					v-if="lastPage > 1"
					:total-pages="lastPage"
					:current-page="currPage"
					:per-page="15"
					:total="lastPage"
					class="mb-48"
					@pagechanged="onPageChange"
				/>
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
import { mapState } from 'vuex'
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
			currPage: parseInt(this.$route.query.page) || 1
		}
	},
	computed: {
		...mapState({
			jobs: state => {
				return state.job.jobs
			}
		}),
		isResultTab() {
			return this.$route.query.tab === 'result'
		},
		localHistory() {
			return this.$store.state.searchKeyData
		},
		lastPage() {
			return this.jobs.length
		},
		jobsPerPage() {
			return this.jobs[this.currPage - 1]
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
		},
		onPageChange(page) {
			const currQuery = this.$route.query
			this.currPage = page
			delete currQuery.page

			this.$router.push({
				query: {
					...currQuery,
					page
				}
			})
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
	z-index: 2;
	bottom: 0;
	margin-top: auto;
}
</style>
