<template>
	<header :class="{ 'blur-active': activateBlur }" class="site-header">
		<div class="container">
			<Logo />

			<div class="header-nav">
				<button
					class="btn--ghost-grey nav-toggle"
					type="button"
					aria-label="Menu"
				>
					<span class="bzi-bars bzi-1_2x" aria-hidden="true"></span>
				</button>
				<div class="nav-container">
					<headerMainNav :main-nav-data="mainNav" />
				</div>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	name: 'Header',
	data() {
		return {
			activateBlur: false,
			mainNav: [
				{
					title: 'Job Listings',
					url: '/job'
				},
				{
					title: 'Analytics',
					url: '/analytics'
				}
			]
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

<style lang="scss">
.site-header {
	display: flex;
	position: fixed;
	z-index: 3;
	top: 0;
	left: 0;
	width: 100%;
	background: transparent;
	height: 60px;
	transition: all 0.3s ease-out;

	&.blur-active {
		background: rgba(45, 49, 77, 0.8);
		backdrop-filter: blur(12px);
	}

	& > .container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&.transparent-header {
		background: transparent;

		.header-link {
			color: #fff;

			&:hover {
				color: $black20;
			}
		}
	}

	@media #{$large} {
		height: 70px;
	}

	// NAV
	.header-nav {
		height: 100%;
	}

	.nav-toggle {
		@media #{$medium} {
			display: none;
		}
	}

	.nav-container {
		display: flex;
		height: 100%;
	}
}
</style>
