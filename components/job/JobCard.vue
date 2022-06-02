<template>
	<a
		href="https://farizrachmansyah.netlify.app"
		target="_blank"
		class="card p-12"
	>
		<div class="mb-48">
			<h1 class="job-name">Job Name</h1>
			<h3 class="comp-name">Company Name</h3>
			<p class="loc-name">Location</p>
		</div>
		<div class="text-light-grey text-right">
			<span class="time-desc pv-4 ph-12 bg-fourty">Time description</span>
		</div>
	</a>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.card {
	box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
	display: inline-block;
	width: 100%;
	border-radius: 16px;
	border: 1px solid $fourty;
	transition: all 0.3s;

	&:hover {
		box-shadow: none;
	}

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
