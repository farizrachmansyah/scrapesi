export const actions = {
	async nuxtServerInit({ dispatch }, { route }) {
		if (route.name === 'job-result') {
			try {
				const objParam = {
					q: route.query.q,
					loc: route.query.loc
				}
				await dispatch('job/getJobs', objParam)
			} catch (error) {}
		}
	}
}
