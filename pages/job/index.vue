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
				<form action="" class="form p-36">
					<div class="mb-24">
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
					<div>
						<label for="loc" class="input-label">Where?</label>
						<input
							id="loc"
							v-model="loc"
							type="text"
							placeholder="Location"
							class="form-input form-input--block"
						/>
					</div>
					<div class="flex f-space-between mt-48">
						<button
							class="btn--ghost-thirdty btn--transparent"
							@click.prevent="reset()"
						>
							Clear
						</button>
						<button class="btn--thirdty" @click.prevent="scrape()">
							Find & Scrape
						</button>
					</div>
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
			loc: ''
		}
	},
	methods: {
		reset() {
			this.query = ''
			this.loc = ''
		},
		scrape() {
			this.$router.push('job/result')
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
	width: 65%;
	margin: 0 auto;

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
	width: 50%;
	margin: 0 auto;
	border-radius: 8px;
	box-shadow: 0 2px 18px 2px rgba($thirdty, 0.25);

	.input-label {
		display: block;
		font-weight: 600;
	}
}
</style>
