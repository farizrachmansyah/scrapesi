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
			<li class="main-nav__item">
				<a
					href="https://github.com/farizrachmansyah/scrapesi"
					target="_blank"
					class="header-link about text-caps text-bold f-12"
				>
					About This Project
				</a>
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
			align-items: center;
		}
	}

	li {
		font-weight: 500;

		&:not(:last-child) {
			margin-bottom: 10px;
		}
		@media #{$medium} {
			&:not(:last-child) {
				margin-bottom: 0;
			}
		}
	}
}

.header-link {
	color: $secondary;
	display: block;
	padding: 5px 10px;

	&.about {
		height: unset;
		padding: 10px 16px;
		border-radius: 4px;
		background: linear-gradient(to right, #31d35c, #2bb7da);
		color: $white;
		white-space: nowrap;

		@media #{$medium} {
			margin-left: 10px;
		}

		&:hover,
		&:focus {
			color: $white;
		}
	}

	&.blur-active {
		@media #{$medium} {
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
	}

	&:hover,
	&:focus,
	&.nuxt-link-active {
		color: $primary;
	}

	&.nuxt-link-active {
		border-right-color: $primary;
	}
}
</style>
