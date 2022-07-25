<template>
	<header :class="{ 'blur-active': activateBlur }" class="site-header">
		<div class="container">
			<Logo />

			<div class="header-nav">
				<button
					:class="{ 'blur-active': activateBlur }"
					class="btn--ghost-primary nav-toggle"
					type="button"
					aria-label="Menu"
					@click.prevent="showNav = !showNav"
				>
					<span class="bzi-bars bzi-1_5x" aria-hidden="true"></span>
				</button>
				<div :class="{ open: showNav }" class="nav-container">
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
			showNav: false,
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
		position: relative;
		display: flex;
		align-items: center;
		height: 100%;
	}

	.nav-toggle {
		padding: 8px 16px;
		border: 1px dashed transparent;

		&:active,
		&:focus,
		&:hover {
			border-color: $primary;
			color: $primary;
			background: transparent;
		}

		&.blur-active {
			color: $white;
			border-color: transparent;

			&:active,
			&:focus,
			&:hover {
				border-color: $white;
			}
		}

		@media #{$medium} {
			display: none;
		}
	}
	.nav-container {
		position: absolute;
		top: 100%;
		right: 0;
		transform: translateY(-15px);
		opacity: 0;
		pointer-events: none;
		padding: 12px;
		border-radius: 4px;
		background: $white;
		box-shadow: 0 2px 18px 2px rgba($accent, 0.25);
		transition: all 0.1s ease-out;

		&.open {
			transform: translateY(15px);
			opacity: 1;
			pointer-events: all;
		}

		@media #{$medium} {
			all: unset;
		}
	}
}
</style>
