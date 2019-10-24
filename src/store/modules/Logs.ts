const state = {
  releasesCount: 0
}

const getters = {
  getReleasesCount: (state: any) => state.releasesCount
}

const mutations = {
  incrementReleasesCount: (state: any) => state.releasesCount++
}

export default {
  state, getters, mutations
}
