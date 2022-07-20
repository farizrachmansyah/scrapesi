<template>
	<nav class="main-nav">
		<ul class="list-nostyle">
			<li v-for="(nav, i) in mainNavData" :key="i" class="main-nav__item">
				<nuxt-link
					:class="{ 'blur-active': activateBlur }"
					class="header-link text-caps text-bold f-12"
					:to="nav.url"
					>{{ nav.title }}</nuxt-link
				>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: 'MainNav',
	props: {
		mainNavData: {
			type: Array,
			default: null
		}
	},
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
.main-nav {
	@media #{$medium} {
		& > ul {
			display: flex;
		}
	}

	li {
		font-weight: 500;
		display: flex;
		align-items: center;
	}

	ul,
	li {
		height: 100%;
	}
}

.header-link {
	color: $secondary;
	height: 100%;
	display: flex;
	align-items: center;
	padding: 5px 10px;
	border-right: 3px solid transparent;
	border-bottom: 3px solid transparent;

	&.blur-active {
		color: $white;

		&:hover,
		&:focus,
		&.nuxt-link-active {
			background: linear-gradient(to right, #31d35c, #2bb7da);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
	}

	&:hover,
	&:focus,
	&.nuxt-link-active {
		color: $primary;
	}

	&.nuxt-link-active {
		border-right-color: $primary;
	}

	@media #{$medium} {
		&.nuxt-link-active {
			border-right-color: transparent;
		}
	}
}
</style>
