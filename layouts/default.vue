<template>
	<div id="app" class="sticky-footer-container">
		<div class="sticky-footer-container-item">
			<Header />
		</div>
		<div class="sticky-footer-container-item --pushed">
			<nuxt />
		</div>
		<div class="sticky-footer-container-item">
			<Footer />
		</div>

		<!-- Popup -->
		<div :class="{ scraping: isScraping }" class="popup-scraping">
			<div class="popup-wrapper">
				<div class="flex">
					<div class="mr-16">
						<i class="spinner"></i>
					</div>
					<div>
						<h1 class="mb-10">Scraping data</h1>
						<p class="mb-0">
							Please wait, this process could take a few minutes.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DefaultLayout',
	data() {
		return {
			isScraping: false
		}
	},
	head() {
		return {
			link: [
				{
					rel: 'canonical',
					href: process.env.BASE_URL + this.$route.path
				}
			]
		}
	},
	mounted() {
		const body = document.getElementsByTagName('body')[0]
		this.$nuxt.$on('startScrape', () => {
			this.isScraping = true
			body.style.overflow = 'hidden'
		})
		this.$nuxt.$on('stopScrape', () => {
			this.isScraping = false
			body.style.overflow = null
		})
		this.$store.commit(
			'history/SET_HISTORY',
			JSON.parse(localStorage.getItem('search'))
		)
		this.$store.commit(
			'history/SET_RECENTKEY',
			JSON.parse(localStorage.getItem('recent_search_key'))
		)
		this.$store.commit(
			'job/STORE_JOBS',
			JSON.parse(localStorage.getItem('recent_search_jobs'))
		)
	}
}
</script>

<style lang="scss" scoped>
.popup-scraping {
	position: fixed;
	z-index: 4;
	top: 0;
	left: 0;
	display: none;
	width: 100%;
	height: 100%;
	background: rgba($black, 0.75);

	&.scraping {
		display: block;
	}

	h1 {
		font-size: 24px;
		color: $primary;
	}

	p {
		color: $secondary;
	}
}
.popup-wrapper {
	position: relative;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 85%;
	max-width: 505.8px;
	padding: 32px;
	border-radius: 8px;
	background: $white;
}
.spinner {
	width: 24px;
	height: 24px;
	border-radius: 50%;
	border: 3px solid rgba($black, 0.1);
	border-top-color: lighten($primary, 5%);
	animation: spinning 1s infinite both;
}
</style>
