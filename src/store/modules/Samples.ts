const state = {
  written: []
}

const getters = {
  getSamplesWritten: (state: any) => state.written,
  isSampleWritten: (state: any) => (sample: string) => state.written.includes(sample)
}

const mutations = {
  writeSample: (state: any, sample: string) => !state.written.includes(sample) && state.written.push(sample)
}

export default {
  state, getters, mutations
}
