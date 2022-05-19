<template>
	<header class="site-header">
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
			mainNav: [
				{
					title: 'Job Listings',
					url: '/job'
				},
				{
					title: 'News',
					url: '/news'
				},
				{
					title: 'About',
					url: '/about'
				},
				{
					title: 'Contact',
					url: '/contact'
				}
			]
		}
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
	background-color: #fff;
	height: 60px;

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

	.header-link {
		color: $primary;
		height: 100%;
		display: flex;
		align-items: center;
		padding: 5px 10px;
		border-right: 3px solid transparent;
		border-bottom: 3px solid transparent;

		&:hover,
		&:focus,
		&.is-active {
			color: $thirdty;
		}

		&.is-active {
			border-right-color: $thirdty;
		}

		@media #{$medium} {
			&.is-active {
				border-right-color: transparent;
				border-bottom-color: $thirdty;
			}
		}
	}
}
</style>
