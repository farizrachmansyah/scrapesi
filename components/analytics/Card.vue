<template>
	<div v-if="slug === 0" class="headline">
		<a
			:href="cardData['url-href']"
			target="_blank"
			class="link-wrapper d-block"
		>
			<div class="headline-wrapper bzg">
				<div class="bzg_c mb-0" data-col="s12m6">
					<div class="headline-image">
						<div class="responsive-media r-16-9">
							<img
								:src="cardData['image-src']"
								alt="News Image"
								class="news-img"
							/>
						</div>
					</div>
				</div>
				<div class="bzg_c mb-0" data-col="s12m6">
					<div class="text-primary mb-8">
						<span class="news-date">{{ cardData.time }}</span>
					</div>
					<span class="text-white text-bold f-30">
						{{ cardData.title }}
					</span>
				</div>
			</div>
		</a>
	</div>

	<a
		v-else
		:href="cardData['url-href']"
		target="_blank"
		class="link-wrapper news-card"
	>
		<div class="mb-24">
			<div class="responsive-media r-16-9">
				<img :src="cardData['image-src']" alt="News Image" class="news-img" />
			</div>
		</div>
		<div>
			<div class="text-secondary mb-8">
				<span class="news-date f-14">{{ cardData.time }}</span>
			</div>
			<span class="text-primary text-bold">
				{{ cardData.title }}
			</span>
		</div>
	</a>
</template>

<script>
export default {
	name: 'NewsCard',
	props: {
		cardData: {
			type: Object,
			default: null
		},
		slug: {
			type: Number,
			default: 0
		}
	}
}
</script>

<style lang="scss" scoped>
.headline {
	border-radius: 16px;
	padding: 28px;
	background: linear-gradient(to right, #31d35c, #2bb7da);

	@media #{$medium} {
		padding: 48px;
	}
	@media #{$large} {
		padding: 64px;
	}
	@media #{$extra_large} {
		padding: 86px;
	}
}

.headline-wrapper.bzg {
	margin-left: -32px;
	@media #{$medium} {
		& > *:first-child {
			order: 2;
		}
	}
}

.headline-image {
	margin-bottom: 24px;

	@media #{$medium} {
		margin-bottom: 0;
	}
}

.bzg_c {
	@media #{$medium} {
		padding-left: 32px;
		margin-bottom: 32px;
	}
}

.news-card {
	display: inline-block;
	height: 100%;
}

.responsive-media {
	border-radius: 16px;
}
.news-img {
	transition: transform 0.3s ease;
}

.news-date {
	display: block;
	line-height: 1;
}

.link-wrapper:hover {
	.news-img {
		transform: scale(1.2);
	}
}
</style>
