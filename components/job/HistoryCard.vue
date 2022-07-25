<template>
	<form action="/job/result" method="GET" @submit="findAndScrape">
		<!-- old way form submitting -->
		<input type="hidden" name="q" :value="cardData.q" />
		<input type="hidden" name="loc" :value="cardData.loc" />
		<input type="hidden" name="tab" value="result" />
		<input type="hidden" name="page" value="1" />

		<button class="btn-wrapper btn--ghost-primary pv-16 ph-24">
			<div class="bzg">
				<div class="bzg_c" data-col="s6">
					<div>
						<div class="mr-24">
							<span>Keyword&Tab;- </span>
							<span class="text-reg">{{
								cardData.q.length ? cardData.q : '-'
							}}</span>
						</div>
						<div>
							<span>Location&Tab;- </span>
							<span class="text-reg">{{
								cardData.loc.length ? cardData.loc : '-'
							}}</span>
						</div>
					</div>
				</div>
				<div class="bzg_c" data-col="s6">
					<div class="icon-wrapper flex h-end v-center">
						<i class="bzi-angle-right bzi-1_5x"></i>
					</div>
				</div>
			</div>
		</button>
	</form>
</template>

<script>
export default {
	props: {
		cardData: {
			type: Object,
			default: () => {}
		}
	},
	methods: {
		seveRecentKey(q, loc) {
			const recentSearch = {
				q,
				loc
			}
			localStorage.setItem('recent_search', JSON.stringify(recentSearch))
		},
		saveHistory(q, loc) {
			const objItem = {
				q,
				loc
			}

			// check storagenya udah ada apa belom array searchnya di storage
			let search
			if (localStorage.getItem('search') === null) {
				search = []
			} else {
				search = JSON.parse(localStorage.getItem('search'))
			}

			search.unshift(objItem)
			localStorage.setItem('search', JSON.stringify(search))
		},
		findAndScrape(e) {
			if (this.cardData.q.length || this.cardData.loc.length) {
				this.seveRecentKey(this.cardData.q, this.cardData.loc)
				this.saveHistory(this.cardData.q, this.cardData.loc)
				return true
			} else {
				e.preventDefault()
			}
		}
	}
}
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
