export interface ISLSError {
    msg: string,
    line: number,
    relativeTop: number
}

const state = {
  errors: [] as ISLSError[],
  cursorLine: -1
}

const getters = {
  getSLSErrors: (state: any) => state.errors,
  getCursorLine: (state: any) => state.cursorLine
}

const mutations = {
  setSLSErrors: (state: any, errors: ISLSError[]) => {
    state.errors = errors
  },
  clearErrorState: (state: any) => {
    state.errors = []
    state.cursorLine = -1
  },
  setCursorLine: (state: any, cursorLine: number) => {
    state.cursorLine = cursorLine
  },
  clearCursorState: (state: any) => {
    state.cursorLine = -1
  }
}

export default {
  state,
  getters,
  mutations
}
