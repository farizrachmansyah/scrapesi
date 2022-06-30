<template>
	<main class="site-main">
		<div class="container">
			<h1>{{ detail.title }}</h1>
			<article v-html="detail.content"></article>
			<ul>
				<li v-for="(item, i) in related" :key="i">
					<nuxt-link :to="'/news/' + item.slug">
						{{ item.title }}
					</nuxt-link>
				</li>
			</ul>
		</div>
	</main>
</template>

<script>
export default {
	head() {
		return {
			...this.$SEOMeta({
				metaTitle: this.detail.seo_meta.seo_title
				// metaDesc: this.detail.seo_meta.seo_description,
				// metaImage: this.metaImg,
				// metaKeywords: this.detail.seo_meta.keywords
			})
		}
	},
	computed: {
		metaImg() {
			let img = 'icon.png'

			if (this.detail.medium_image.length) {
				img = this.detail.medium_image[0].url
			}

			return img
		}
	}
}
</script>

<style lang="scss" scoped></style>
