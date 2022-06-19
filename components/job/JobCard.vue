<template>
	<a :href="cardData.url" target="_blank" class="card p-12">
		<div class="mb-48">
			<h1 class="job-name">{{ cardData.jobTitle }}</h1>
			<h3 class="comp-name">{{ cardData.companyName }}</h3>
			<p class="loc-name">{{ cardData.jobLocation }}</p>
		</div>
		<div class="text-light-grey text-right">
			<span class="time-desc pv-4 ph-12 bg-fourty">Time description</span>
		</div>
	</a>
</template>

<script>
export default {
	props: {
		cardData: {
			type: Object,
			default: () => {}
		}
	}
}
</script>

<style lang="scss" scoped>
.card {
	box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	border-radius: 16px;
	border: 1px solid $fourty;
	transition: all 0.3s;

	&:hover {
		box-shadow: none;
	}

	& > *:last-child {
		margin-top: auto;
	}

	.job-name,
	.comp-name,
	.loc-name {
		line-height: 1;
	}

	.job-name {
		font-size: 24px;
		line-height: 1.2;
	}
	.comp-name,
	.loc-name {
		font-size: 16px;
		font-weight: 400;
	}
	.comp-name {
		margin-bottom: 4px;
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
