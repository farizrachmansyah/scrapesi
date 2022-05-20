<template>
	<main class="site-main">
		<section class="container">
			<div class="tab-nav">
				<ul class="list-nostyle">
					<li>Result</li>
					<li>History</li>
				</ul>
			</div>
		</section>
		<section class="container">
			<div class="pv-24">
				<!-- <span>Your scraped job's data will appear here.</span> -->
			</div>
		</section>
		<JobResult class="result-component" />
	</main>
</template>

<script>
import JobResult from '~/components/job/JobResults.vue'
export default {
	components: {
		JobResult
	}
}
</script>

<style lang="scss" scoped>
.site-main {
	height: calc(100% - 70px);
}

.result-component {
	position: absolute;
	bottom: 0;
	width: 100%;
}
</style>
