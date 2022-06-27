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
								<label for="xls" class="opts__item f-14">
									<input
										id="xls"
										v-model="selectedExt"
										value="xls"
										type="radio"
										style="visibility: hidden; width: 0"
										@change="
											setExt(selectedExt)
											openDropdown = false
										"
									/>
									<span>xls</span>
								</label>
							</div>
							<div class="select-custom__opts">
								<label for="csv" class="opts__item f-14">
									<input
										id="csv"
										v-model="selectedExt"
										value="csv"
										type="radio"
										style="visibility: hidden; width: 0"
										@change="
											setExt(selectedExt)
											openDropdown = false
										"
									/>
									<span>csv</span>
								</label>
							</div>
						</div>
					</div>
				</div>
				<div class="option-btn">
					<DownloadExcel
						class="btn--ghost-primary"
						:data="perPageData"
						:fields="json_fields"
						:type="selectedExt"
						:name="getFileName((isPage = true))"
					>
						Download This Page
					</DownloadExcel>
					<DownloadExcel
						class="btn--primary"
						:data="allJobsData"
						:fields="json_fields"
						:type="selectedExt"
						:name="getFileName((isPage = false))"
					>
						Download All
					</DownloadExcel>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		allPageData: {
			type: Array,
			default: () => []
		},
		perPageData: {
			type: Array,
			default: () => []
		},
		page: {
			type: Number,
			default: null
		},
		query: {
			type: String,
			default: null
		},
		location: {
			type: String,
			default: null
		}
	},
	data() {
		return {
			openDropdown: false,
			selectedExt: 'xls',
			json_fields: {
				'Job Title': 'jobTitle',
				'Company Name': 'companyName',
				Location: 'jobLocation',
				'Time Status': 'time',
				'Site Source': 'url'
			},
			json_meta: [
				[
					{
						key: 'charset',
						value: 'utf-8'
					}
				]
			]
		}
	},
	computed: {
		allJobsData() {
			const jobs = []
			this.allPageData.forEach(page => {
				jobs.push(...page)
			})
			return jobs
		}
	},
	methods: {
		setExt(ext) {
			this.selectedExt = ext
		},
		getFileName(isPage) {
			if (isPage) {
				return `[List of Jobs] Page ${this.page} - ${this.query} in ${this.location}.${this.selectedExt}`
			} else {
				return `[List of Jobs] All Pages - ${this.query} in ${this.location}.${this.selectedExt}`
			}
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
	box-shadow: 0 3px 8px rgba($black, 0.1);
	top: 0;
	left: 0;
	position: absolute;
	transform: translate(0, -95%);
	width: 100px;
}

.select-custom.is-active {
	.select-custom__panel {
		transform: translate(0, -105%);
	}
}
</style>
