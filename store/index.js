/* eslint-disable no-console */
export const actions = {
	async nuxtServerInit({ dispatch }, { route }) {
		if (route.name === 'job-result') {
			try {
				if (route.query.q || route.query.loc) {
					const urlQuery = {
						q: route.query.q || '',
						loc: route.query.loc || ''
					}
					await dispatch('job/getJobs', urlQuery)
				}
			} catch (err) {
				console.error(err)
			}
		}
	}
}
