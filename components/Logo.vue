<template>
	<nuxt-link
		to="/job"
		:class="{ 'blur-active': activateBlur }"
		class="site-logo"
	>
		Scrapesi
	</nuxt-link>
</template>

<script>
export default {
	data() {
		return {
			activateBlur: false
		}
	},
	mounted() {
		const scrollTrigger = 60
		window.addEventListener('scroll', () => {
			if (
				window.scrollY >= scrollTrigger ||
				window.pageYOffset >= scrollTrigger
			) {
				this.activateBlur = true
			} else {
				this.activateBlur = false
			}
		})
	}
}
</script>

<style lang="scss" scoped>
.site-logo {
	font-family: $base_logo_font;
	font-weight: 700;
	font-size: 1.5rem;
	letter-spacing: -2px;
	color: $primary;

	&.blur-active {
		color: $white;
	}
}
</style>
