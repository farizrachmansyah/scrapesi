<template>
	<button
		class="btn-wrapper btn--ghost-primary pv-16 ph-24"
		@click.prevent="scrape()"
	>
		<div class="bzg">
			<div class="bzg_c" data-col="s6">
				<div class="flex">
					<div class="mr-24">
						<span class="d-block">Keyword</span>
						<span class="text-reg">{{
							cardData.q.length ? cardData.q : '-'
						}}</span>
					</div>
					<div>
						<span class="d-block">Location</span>
						<span class="text-reg">{{
							cardData.loc.length ? cardData.loc : '-'
						}}</span>
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
export default {
	props: {
		cardData: {
			type: Object,
			default: () => {}
		}
	},
	methods: {
		saveSearchKey(q, loc) {
			// siapin object
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

			search.push(objItem)
			localStorage.setItem('search', JSON.stringify(search))
			this.$store.commit(
				'SET_SEARCHKEY',
				JSON.parse(localStorage.getItem('search'))
			)
		},
		scrape() {
			if (this.cardData.q.length || this.cardData.loc.length) {
				this.saveSearchKey(this.cardData.q, this.cardData.loc)
			}

			// modify query
			this.modifyPageQuery()
		},
		modifyPageQuery() {
			const currQuery = this.$route.query
			delete currQuery.q
			delete currQuery.loc
			delete currQuery.tab

			this.$router.push({
				path: '/job/result',
				query: {
					q: this.cardData.q,
					loc: this.cardData.loc,
					tab: 'result'
				}
			})
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
