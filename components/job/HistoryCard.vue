<template>
	<button class="btn-wrapper btn--ghost-primary pv-16 ph-24">
		<div class="bzg">
			<div class="bzg_c" data-col="s6">
				<div class="flex">
					<div class="mr-24">
						<span class="d-block">Keyword</span>
						<span class="text-reg">Job key</span>
					</div>
					<div>
						<span class="d-block">Location</span>
						<span class="text-reg">Jakarta</span>
					</div>
				</div>
			</div>
			<div class="bzg_c" data-col="s6">
				<div class="icon-wrapper flex h-end v-center">
					<i class="bzi-caret-right bzi-1_5x"></i>
				</div>
			</div>
		</div>
	</button>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.btn-wrapper {
	width: 100%;
	text-align: left;
	border-radius: 0;
	border: none;
	border-bottom: 1px solid $primary;
}

.bzg_c {
	margin-bottom: 0;
}

.icon-wrapper {
	height: 100%;
}
</style>
