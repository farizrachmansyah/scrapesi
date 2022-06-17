<template>
	<main class="site-main">
		<div class="container pv-48 ph-24">
			<section class="info site-section">
				<h4 class="title text-caps f-16">
					a free automated job vacancies scraping converter tools
				</h4>
				<h1 class="subtitle text-cap m-0">
					collect targeted job vacancies and convert them into spreadsheet
					documents easily
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
					<label v-show="hasRecentKey" class="text-red d-block f-12">
						You don't have any recent search.
					</label>
					<div class="form-action flex mt-48">
						<button
							class="btn--ghost-thirdty btn--transparent"
							@click.prevent="reset()"
						>
							Clear
						</button>
						<button class="btn--ghost-thirdty" @click.prevent="goToRecent()">
							Recent Results
						</button>
						<button class="btn--thirdty">Find & Scrape</button>
					</div>

					<!-- old way form submitting -->
					<input type="hidden" name="q" :value="query" />
					<input type="hidden" name="loc" :value="loc" />
					<input type="hidden" name="tab" value="result" />
					<input type="hidden" name="page" value="1" />
				</form>
			</section>
		</div>
		<!-- <div class="wrapper">
			<JobResults />
		</div> -->
	</main>
</template>

<script>
export default {
	data() {
		return {
			query: '',
			loc: '',
			isWarning: false,
			hasRecentKey: false
		}
	},
	methods: {
		reset() {
			this.query = ''
			this.loc = ''
		},
		saveSearchKey(q, loc) {
			// siapin object
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

			search.push(objItem)
			localStorage.setItem('search', JSON.stringify(search))
			this.$store.commit(
				'SET_SEARCHKEY',
				JSON.parse(localStorage.getItem('search'))
			)
		},
		findAndScrape(e) {
			// check fields and save history
			if (this.query.length || this.loc.length) {
				this.isWarning = false
				this.saveSearchKey(this.query, this.loc)
				return true
			} else {
				this.isWarning = true
				e.preventDefault()
			}
		},
		goToRecent() {
			const keyHistory = JSON.parse(localStorage.getItem('search'))
			if (keyHistory && keyHistory.length) {
				this.hasRecentKey = false
				const keyObj = keyHistory[keyHistory.length - 1]
				this.$router.push({
					path: '/job/result',
					query: {
						q: keyObj.q,
						loc: keyObj.loc,
						tab: 'result',
						page: 1
					}
				})
			} else {
				this.hasRecentKey = true
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.site-main {
	.wrapper {
		background: $fourty;
	}
}

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
		color: $thirdty;
	}
	.subtitle {
		line-height: 1.2;
		font-family: $font_sec_serif;
		font-weight: 800;
	}
}

.form {
	max-width: 600px;
	margin: 0 auto;
	border-radius: 8px;
	box-shadow: 0 2px 18px 2px rgba($thirdty, 0.25);

	.input-label {
		display: block;
		font-weight: 600;
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
}
</style>
