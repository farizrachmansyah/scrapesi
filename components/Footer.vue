<template>
	<footer class="site-footer">
		<div class="container pv-24">
			<span class="copy f-12">&copy; 2022 Scrapesi.</span>
		</div>
	</footer>
</template>

<script>
export default {
	name: 'Footer'
}
</script>

<style lang="scss" scoped>
.site-footer {
	background: $primary;
}

.copy {
	color: $light;
	font-weight: 500;
}
</style>
