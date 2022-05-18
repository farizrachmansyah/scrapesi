<template>
	<header class="site-header">
		<div class="container">
			<Logo />
			<headerSiteSearch />
			<!-- nested component SiteSearch -->
			<HeaderNav />
		</div>
	</header>
</template>

<script>
export default {
	name: 'Header'
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
	box-shadow: 0px 3px 4px rgba($black, 0.15);

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
}
</style>
