import { IStorySample } from '@/models/StorySample'

const state = {
  payload: {}
}

const getters = {
  getPayload: (state: any) => state.payload
}

const mutations = {
  setPayload: (state: any, payload: IStorySample) => {
    state.payload = payload
  }
}

export default {
  state, getters, mutations
}
