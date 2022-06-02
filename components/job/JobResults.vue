<template>
	<section class="wrapper">
		<div class="container pv-36">
			<h4 class="text-caps mb-24">download scraped data</h4>
			<div class="flex v-end f-space-between">
				<div class="option-ext">
					<p class="mb-0">Download as</p>
					<div :class="{ 'is-active': openDropdown }" class="select-custom">
						<div class="select-custom__trigers">
							<button
								class="btn-trigger btn--transparent"
								@click.prevent="openDropdown = !openDropdown"
							>
								<span class="mr-16">{{ selectedExt }}</span>
								<span
									:class="[openDropdown ? 'bzi-caret-up' : 'bzi-caret-down']"
								></span>
							</button>
						</div>
						<div class="select-custom__panel">
							<div class="select-custom__opts">
								<label for="xlsx" class="opts__item f-14">
									<input
										id="xlsx"
										v-model="selectedExt"
										value=".xlsx"
										type="radio"
										style="visibility: hidden; width: 0"
										@change="
											setExt(selectedExt)
											openDropdown = false
										"
									/>
									<span>.xlsx</span>
								</label>
							</div>
							<div class="select-custom__opts">
								<label for="csv" class="opts__item f-14">
									<input
										id="csv"
										v-model="selectedExt"
										value=".csv"
										type="radio"
										style="visibility: hidden; width: 0"
										@change="
											setExt(selectedExt)
											openDropdown = false
										"
									/>
									<span>.csv</span>
								</label>
							</div>
						</div>
					</div>
				</div>
				<div class="option-btn">
					<button class="btn--ghost-primary">Download This Page</button>
					<button class="btn--primary">Download All</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			openDropdown: false,
			selectedExt: '.xlsx'
		}
	},
	methods: {
		setExt(ext) {
			this.selectedExt = ext
		}
	}
}
</script>

<style lang="scss" scoped>
.wrapper {
	background: $white;
	border-top: 3px solid $primary;
	border-bottom: 3px solid $primary;
}

.btn-trigger {
	width: unset !important;
	padding: 0 !important;
	border-radius: 0;
	border-bottom: 1px solid $fourty;
	color: $fourty;
}

.select-custom__panel {
	width: 100px;
}
</style>
