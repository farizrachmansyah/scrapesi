import jobScraper from '~/jobscraper'

export const state = () => ({
	jobs: []
})

export const getters = {
	getJobs: state => () => {
		return state.jobs
	}
}

export const mutations = {
	STORE_JOBS(state, payload) {
		state.jobs = payload
	}
}

export const actions = {
	async getJobs({ commit }, param) {
		const data = await jobScraper.scrapeJob(param.q, param.loc)
		if (data.length) {
			commit('STORE_JOBS', data)
			return data
		}
	}
}
