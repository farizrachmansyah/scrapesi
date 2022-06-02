<template>
	<div class="card p-12">
		<div class="mb-48">
			<h1 class="job-name">Job Name</h1>
			<h3 class="comp-name">Company Name</h3>
			<p class="loc-name">Location</p>
		</div>
		<div class="text-light-grey text-right">
			<span class="time-desc pv-4 ph-12 bg-fourty">Time description</span>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.card {
	border-radius: 16px;
	border: 1px solid $fourty;

	.job-name,
	.comp-name,
	.loc-name {
		margin-bottom: 10px;
		line-height: 1;
	}

	.job-name {
		font-size: 28px;
	}
	.comp-name,
	.loc-name {
		font-size: 16px;
		font-weight: 400;
	}
	.loc-name {
		color: $grey;
	}
	.time-desc {
		border-radius: 16px;
		font-size: 14px;
	}
}
</style>
