<template>
	<main class="site-main">
		<div class="container pv-48 ph-24">
			<section class="info site-section">
				<h4 class="title text-caps f-16">
					a free automated job vacancies scraping converter tools
				</h4>
				<h1 class="subtitle text-cap m-0">
					collect targeted job vacancies and convert them into spreadsheet
					documents <span class="tagline">easily</span>
				</h1>
			</section>
			<section class="site-section">
				<form
					action="/job/result"
					method="GET"
					class="form p-36"
					@submit="findAndScrape"
				>
					<div class="mb-16">
						<label for="query" class="input-label">
							What are u looking for?
						</label>
						<input
							id="query"
							v-model="query"
							type="text"
							placeholder="Job title, keywords, or company name"
							class="form-input form-input--block"
						/>
					</div>
					<div class="mb-8">
						<label for="loc" class="input-label">Where?</label>
						<input
							id="loc"
							v-model="loc"
							type="text"
							placeholder="Location"
							class="form-input form-input--block"
						/>
					</div>
					<label v-show="isWarning" class="text-red d-block f-12">
						Please fill out one of the following fields.
					</label>
					<label v-show="!hasRecentKey" class="text-red d-block f-12">
						You don't have any recent search.
					</label>
					<div class="form-action flex mt-48">
						<button class="btn--transparent" @click.prevent="reset()">
							Clear
						</button>
						<button
							class="btn--ghost-accent btn-recent"
							@click.prevent="goToRecent()"
						>
							Recent Results
						</button>
						<button class="btn--accent btn-find">Find & Scrape</button>
					</div>

					<!-- old way form submitting -->
					<input type="hidden" name="q" :value="query" />
					<input type="hidden" name="loc" :value="loc" />
					<input type="hidden" name="tab" value="result" />
					<input type="hidden" name="page" value="1" />
				</form>
			</section>
		</div>
	</main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	data() {
		return {
			query: '',
			loc: '',
			isWarning: false,
			hasRecentKey: true
		}
	},
	computed: {
		...mapGetters({
			getJobs: 'job/getJobs',
			getHistory: 'history/getHistory',
			getRecent: 'history/getRecent'
		})
	},
	methods: {
		reset() {
			this.query = ''
			this.loc = ''
		},
		seveRecentKey(q, loc) {
			const recentSearch = {
				q,
				loc
			}
			localStorage.setItem('recent_search', JSON.stringify(recentSearch))
			this.$store.commit(
				'history/SET_RECENTKEY',
				JSON.parse(localStorage.getItem('recent_search'))
			)
		},
		saveHistory(q, loc) {
			const objItem = {
				q,
				loc
			}

			// check storagenya udah ada apa belom array searchnya di storage
			let search
			if (localStorage.getItem('search') === null) {
				search = []
			} else {
				search = JSON.parse(localStorage.getItem('search'))
			}

			search.unshift(objItem)
			localStorage.setItem('search', JSON.stringify(search))
			this.$store.commit(
				'history/SET_HISTORY',
				JSON.parse(localStorage.getItem('search'))
			)
		},
		findAndScrape(e) {
			// check fields and save history
			if (this.query.length || this.loc.length) {
				this.$nuxt.$emit('startScrape', true)
				this.isWarning = false
				this.hasRecentKey = true

				this.seveRecentKey(this.query, this.loc)
				this.saveHistory(this.query, this.loc)
				return true
			} else {
				this.isWarning = true
				e.preventDefault()
			}
		},
		goToRecent() {
			const recentKey = this.getRecent()
			const jobs = this.getJobs()

			if (recentKey && jobs.length) {
				this.hasRecentKey = true
				this.$router.push({
					path: '/job/result',
					query: {
						q: recentKey.q,
						loc: recentKey.loc,
						tab: 'result',
						page: 1
					}
				})
			} else {
				this.hasRecentKey = false
			}
		}
	}
}
</script>

<style lang="scss" scoped>
// .site-main {
// 	background: $white;
// }

.site-section {
	padding: 36px 0;
}

.info {
	width: 90%;
	margin: 0 auto;

	@media #{$large} {
		width: 65%;
	}

	& > * {
		text-align: center;
	}

	.title {
		color: $secondary;
	}
	.subtitle {
		color: $primary;
		line-height: 1.2;
		font-family: $font_sec_serif;
		font-weight: 800;

		.tagline {
			position: relative;
			&::before {
				content: '';
				position: absolute;
				bottom: 6px;
				left: 0;
				width: 100%;
				height: 5px;
				background: linear-gradient(to right, #31d35c, #2bb7da);
				border-radius: 4px;
			}
		}
	}
}

.form {
	max-width: 600px;
	margin: 0 auto;
	border-radius: 8px;
	background: $white;
	box-shadow: 0 2px 18px 2px rgba($accent, 0.25);

	.input-label {
		color: $primary;
		display: block;
		font-weight: 600;
	}

	.form-input {
		color: $primary;
		background: transparent;
		border-color: $primary;
	}
}

.form-action {
	flex-direction: column-reverse;

	& > * {
		margin-bottom: 12px;
	}

	@media #{$medium} {
		flex-direction: row;

		& > *:nth-child(2) {
			margin-left: auto;
			margin-right: 12px;
		}
	}

	.btn--transparent {
		color: $accent;
	}
	.btn-recent:hover {
		color: $white;
		// background: $accent;
	}
	.btn-find {
		background: linear-gradient(to right, #31d35c, #2bb7da);
	}
}
</style>
