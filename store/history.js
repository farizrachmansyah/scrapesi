export const state = () => ({
	searchKeyData: [],
	recentKey: {}
})

export const getters = {
	getHistory: state => () => {
		return state.searchKeyData
	},
	getRecentKey: state => () => {
		return state.recentKey
	}
}

export const mutations = {
	SET_HISTORY(state, key) {
		state.searchKeyData = key
	},
	SET_RECENTKEY(state, key) {
		state.recentKey = key
	}
}
