import { actionTree, getterTree, mutationTree } from 'typed-vuex'
import { fetchImages } from '~/app/services/marketplace'
import { UiImage } from '~/types'

const initialStateFactory = () => ({
  images: [] as UiImage[],
  ownedImages: [] as UiImage[],
})
const initialState = initialStateFactory()

export const state = () => ({
  images: initialState.images as UiImage[],
  ownedImages: initialState.ownedImages as UiImage[],
})

export type MarketplaceStoreState = ReturnType<typeof state>

export const getters = getterTree(state, {
  ownedImages: (state, _getters, rootState) => {
    return rootState.wallet.address && rootState.wallet.addressConfirmation
      ? [...state.images].filter(
          (image) =>
            image.seller.toLowerCase() ===
            rootState.wallet.address.toLowerCase()
        )
      : []
  },
})

export const mutations = mutationTree(state, {
  setImages(state: MarketplaceStoreState, images: UiImage[]) {
    state.images = images
  },

  setOwnedImages(state: MarketplaceStoreState, ownedImages: UiImage[]) {
    state.ownedImages = ownedImages
  },

  reset(state: MarketplaceStoreState) {
    const initialState = initialStateFactory()

    state.images = initialState.images
    state.ownedImages = initialState.ownedImages
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async fetchImages({ commit }) {
      commit('setImages', await fetchImages())
    },

    async fetchOwnedImages({ commit, state }) {
      const { address, isUserWalletConnected } = this.app.$accessor.wallet

      if (!address || !isUserWalletConnected) {
        return
      }

      commit(
        'setImages',
        await Promise.resolve(
          [...state.images].filter(
            (image) => image.seller.toLowerCase() === address.toLowerCase()
          )
        )
      )
    },

    async reset({ commit }) {
      await Promise.resolve(commit('reset'))
    },
  }
)
