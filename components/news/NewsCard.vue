<template>
	<div v-if="slug === 0" class="headline bg-light">
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
					<div class="text-grey mb-8">
						<span class="news-date">{{ cardData.time }}</span>
					</div>
					<span class="text-bold f-30">
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
			<div class="text-grey mb-8">
				<span class="news-date f-14">{{ cardData.time }}</span>
			</div>
			<span class="text-bold">
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
	// computed: {
	// 	publishDate() {
	// 		const date = new Date(this.cardData.publishedAt)
	// 		const options = {
	// 			weekday: 'long',
	// 			year: 'numeric',
	// 			month: 'long',
	// 			day: 'numeric'
	// 		}
	// 		return date.toLocaleDateString('in', options)
	// 	}
	// }
}
</script>

<style lang="scss" scoped>
.headline {
	border-radius: 16px;
	padding: 28px;

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
