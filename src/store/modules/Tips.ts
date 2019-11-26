export interface IStoreTips {
  samplesShown: string[]
}

const state: IStoreTips = {
  samplesShown: []
}

const getters = {
  hasTipsBeenShown: (state: any) => (sampleId: string) => state.samplesShown.includes(sampleId)
}

const mutations = {
  sampleHasBeenShown: (state: any, sampleId: string) => {
    if (!state.samplesShown.includes(sampleId)) {
      state.samplesShown.push(sampleId)
    }
  }
}

export default {
  state, getters, mutations
}
