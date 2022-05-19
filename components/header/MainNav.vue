<template>
	<nav class="main-nav">
		<ul class="list-nostyle">
			<li v-for="(nav, i) in mainNavData" :key="i" class="main-nav__item">
				<nuxt-link class="header-link text-caps text-bold f-12" :to="nav.url">{{
					nav.title
				}}</nuxt-link>
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
</style>
