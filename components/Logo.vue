<template>
	<nuxt-link to="/" :class="{ 'blur-active': activateBlur }" class="site-logo">
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
	font-size: 3rem;
	color: $primary;

	&.blur-active {
		color: $white;
	}
}
</style>
