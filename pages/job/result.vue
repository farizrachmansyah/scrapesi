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
					<li v-show="!isResultTab" class="last-tab-item">
						<div :class="{ 'is-active': openTabOption }" class="select-custom">
							<div class="select-custom__trigers">
								<button
									class="btn--transparent"
									@click.prevent="openTabOption = !openTabOption"
								>
									<span class="bzi-filter text-bold"></span>
								</button>
							</div>
							<div class="select-custom__panel">
								<div class="select-custom__opts">
									<button
										class="opts__item btn--ghost-primary f-12"
										@click.prevent="clearHistory()"
									>
										Clear History
									</button>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</section>
		<section class="container">
			<div v-if="isResultTab" class="pv-24">
				<div v-if="jobs.length">
					<p class="mb-24">
						Found {{ totalJobs }} vacancies for
						<span class="text-bold">{{ $route.query.q }}</span> positions in
						<span class="text-bold">{{ $route.query.loc }}</span> and
						<span class="text-bold"> others related data</span>.
					</p>
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
				</div>
				<div v-else>
					<div class="not-found">
						<h1>Aww.. we're very sorry,</h1>
						<h1>data not found &#128532;</h1>
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
					v-for="(data, i) in history"
					:key="`hcard-${i}`"
					:card-data="data"
				/>
			</div>
		</section>
		<JobResult
			v-if="jobs.length && isResultTab"
			:per-page-data="jobsPerPage"
			:page="currPage"
			:query="$route.query.q"
			:location="$route.query.loc"
			:all-page-data="jobs"
			class="result-component"
		/>
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
			currPage: parseInt(this.$route.query.page) || 1,
			openTabOption: false
		}
	},
	computed: {
		...mapState({
			jobs: state => {
				return state.job.jobs
			},
			history: state => {
				return state.history.searchKeyData
			}
		}),
		isResultTab() {
			return this.$route.query.tab === 'result'
		},
		lastPage() {
			return this.jobs.length
		},
		jobsPerPage() {
			return this.jobs.length ? this.jobs[this.currPage - 1] : []
		},
		totalJobs() {
			let counter = 0
			this.jobs.forEach(page => {
				counter += page.length
			})
			return counter
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
		},
		clearHistory() {
			const search = JSON.parse(localStorage.getItem('search'))
			if (search && search.length) {
				localStorage.setItem('search', JSON.stringify([]))
				this.$store.commit(
					'history/SET_HISTORY',
					JSON.parse(localStorage.getItem('search'))
				)
			}
			this.openTabOption = false
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

.last-tab-item {
	margin-left: auto;
}
.select-custom__panel {
	padding: 0;
	box-shadow: 0 3px 8px rgba($black, 0.1);
	top: 0;
	left: unset;
	right: 0;
	position: absolute;
	transform: translate(0, 95%);
	width: 110px;

	.opts__item {
		width: 100%;
		padding: 6px 0;
	}
}

.select-custom.is-active {
	.select-custom__panel {
		transform: translate(0, 125%);
	}
}

.result-component {
	position: sticky;
	z-index: 2;
	bottom: 0;
	margin-top: auto;
}

.not-found {
	padding: 64px 0;
	text-align: center;
}
</style>
