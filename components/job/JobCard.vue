<template>
	<a
		v-if="cardData"
		:href="cardData.url ? cardData.url : ''"
		target="_blank"
		class="card p-6"
	>
		<div class="p-12">
			<div class="mb-48">
				<h1 class="text-primary job-name">{{ cardData.jobTitle }}</h1>
				<h3 class="text-secondary comp-name">{{ cardData.companyName }}</h3>
				<p class="text-secondary loc-name">{{ cardData.jobLocation }}</p>
			</div>
			<div class="text-darken text-right">
				<span class="time-desc pv-4 ph-12 bg-primary">{{ cardData.time }}</span>
			</div>
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
	display: inline-block;
	width: 100%;
	height: 100%;
	border-radius: 16px;
	transition: all 0.3s ease;
	background: linear-gradient(to right, #31d35c, #2bb7da);

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		max-height: 0;
		border-radius: 16px;
		background: rgba($primary, 0.75);
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
		&::before {
			opacity: 1;
			max-height: 100%;
		}
		&::after {
			opacity: 1;
		}
	}

	& > div {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: $white;
		border-radius: 10px;

		& > *:last-child {
			margin-top: auto;
		}
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
	.time-desc {
		border-radius: 16px;
		font-size: 12px;
	}
}
</style>
