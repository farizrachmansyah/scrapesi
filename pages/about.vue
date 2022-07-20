<template>
	<main class="site-main">
		<section class="container pv-48">
			<div class="jumbotron bzg v-center">
				<div class="bzg_c mb-0" data-col="m6">
					<div class="jumbotron-text">
						<h1 class="text-primary">
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
						</h1>
						<h5 class="mb-0">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
							beatae?
						</h5>
					</div>
				</div>
				<div class="bzg_c mb-0" data-col="m6">
					<div class="jumbotron-media">
						<div class="responsive-media r-16-9">
							<img src="/assets/about.svg" alt="about image" />
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="container pv-48">
			<span class="d-block mb-12 text-small text-caps text-lightsize">
				About This Tools
			</span>
			<h1>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
				expedita quia, non sapiente iste doloribus!
			</h1>
		</section>
		<section class="container pv-48">
			<span class="d-block mb-12 text-small text-caps text-lightsize">
				features
			</span>
			<div class="bzg">
				<div
					v-for="data in 3"
					:key="`fcard-${data}`"
					class="bzg_c"
					data-col="s12m4"
				>
					<FeatureCard />
				</div>
			</div>
		</section>
	</main>
</template>

<script>
import FeatureCard from '~/components/about/FeatureCard.vue'

export default {
	components: {
		FeatureCard
	},
	data() {
		return {}
	},
	head() {
		return {
			...this.$SEOMeta({
				metaTitle: 'About'
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.jumbotron > *:first-child {
	order: 2;

	@media #{$medium} {
		order: 1;
	}
}
.jumbotron > *:last-child {
	order: 1;

	@media #{$medium} {
		order: 2;
	}
}

.jumbotron-text {
	text-align: center;

	@media #{$medium} {
		text-align: left;
		padding-right: 24px;
	}
}
.jumbotron-media {
	margin-bottom: 24px;

	@media #{$medium} {
		margin-bottom: 0;
		padding-left: 24px;
	}
}

.responsive-media {
	border-radius: 16px;
}
</style>
