import { actionTree, getterTree, mutationTree } from 'typed-vuex'
import { fetchImages } from '~/app/services/marketplace'
import { UiImage } from '~/types'

const initialStateFactory = () => ({
  images: [] as UiImage[],
})
const initialState = initialStateFactory()

export const state = () => ({
  images: initialState.images as UiImage[],
})

export type MarketplaceStoreState = ReturnType<typeof state>

export const getters = getterTree(state, {
  //
})

export const mutations = mutationTree(state, {
  setImages(state: MarketplaceStoreState, images: UiImage[]) {
    state.images = images
  },

  reset(state: MarketplaceStoreState) {
    const initialState = initialStateFactory()

    state.images = initialState.images
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async fetchImages({ commit }) {
      commit('setImages', await fetchImages())
    },

    async reset({ commit }) {
      await Promise.resolve(commit('reset'))
    },
  }
)
