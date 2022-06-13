<template>
	<main class="site-main">
		<section class="container pv-48">
			<div class="bzg v-center">
				<div class="bzg_c mb-0" data-col="s6">
					<div class="pr-24">
						<h1 class="text-fourty">
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
						</h1>
						<h5 class="mb-0">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
							beatae?
						</h5>
					</div>
				</div>
				<div class="bzg_c mb-0" data-col="s6">
					<div class="pl-24">
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
				metaTitle: 'About Us'
			})
		}
	}
}
</script>

<style lang="scss" scoped></style>
