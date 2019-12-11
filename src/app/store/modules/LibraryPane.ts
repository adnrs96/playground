export interface ILibraryStore {
  open: boolean
}

const state: ILibraryStore = {
  open: true
}

const getters = {
  isLibraryPaneOpen: (state: ILibraryStore) => state.open
}

const mutations = {
  toggleLibraryPane: (state: ILibraryStore) => {
    state.open = !state.open
  }
}

export default {
  state,
  getters,
  mutations
}
