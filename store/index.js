export const state = () => ({
	searchKeyData: []
})

export const mutations = {
	SET_SEARCHKEY(state, key) {
		state.searchKeyData = key
	}
}
