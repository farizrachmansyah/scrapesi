<template>
	<a :href="cardData.url" target="_blank" class="card p-12">
		<div class="mb-48">
			<h1 class="job-name">{{ cardData.jobTitle }}</h1>
			<h3 class="comp-name">{{ cardData.companyName }}</h3>
			<p class="loc-name">{{ cardData.jobLocation }}</p>
		</div>
		<div class="text-light-grey text-right">
			<span class="time-desc pv-4 ph-12 bg-fourty">{{ cardData.time }}</span>
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
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	border-radius: 16px;
	border: 1px solid $fourty;
	transition: all 0.3s ease;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		max-height: 0;
		border-radius: 16px;
		background: $black;
		opacity: 0;
		transition: all 0.3s ease;
	}
	&::after {
		content: 'Go to site';
		position: absolute;
		z-index: 2;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: $white;
		font-weight: 600;
		opacity: 0;
		transition: all 0.1s ease 0.3s;
	}

	&:hover {
		border-color: transparent;

		&::before {
			opacity: 1;
			max-height: 100%;
		}
		&::after {
			opacity: 1;
		}
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
		font-size: 12px;
	}
}
</style>
