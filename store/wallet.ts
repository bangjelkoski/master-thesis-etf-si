import { actionTree, getterTree, mutationTree } from 'typed-vuex'
import {
  confirm,
  getAddresses,
  isMetamaskInstalled,
} from '~/app/services/wallet'

const initialStateFactory = () => ({
  address: '' as string,
  addressConfirmation: '' as string,
  addresses: [] as string[],
  metamaskInstalled: false as boolean,
})
const initialState = initialStateFactory()

export const state = () => ({
  address: initialState.address as string,
  addressConfirmation: initialState.addressConfirmation as string,
  addresses: initialState.addresses as string[],
  metamaskInstalled: false as boolean,
})

export type WalletStoreState = ReturnType<typeof state>

export const getters = getterTree(state, {
  isUserWalletConnected: (state) => {
    const addressConnectedAndConfirmed =
      !!state.address && !!state.addressConfirmation
    const hasAddresses = state.addresses.length > 0

    return hasAddresses && addressConnectedAndConfirmed
  },
})

export const mutations = mutationTree(state, {
  setAddress(state: WalletStoreState, address: string) {
    state.address = address
  },

  setAddressConfirmation(state: WalletStoreState, addressConfirmation: string) {
    state.addressConfirmation = addressConfirmation
  },

  setAddresses(state: WalletStoreState, addresses: string[]) {
    state.addresses = addresses
  },

  setMetamaskInstalled(state: WalletStoreState, metamaskInstalled: boolean) {
    state.metamaskInstalled = metamaskInstalled
  },

  logout(state: WalletStoreState) {
    const initialState = initialStateFactory()

    state.address = initialState.address
    state.addressConfirmation = initialState.addressConfirmation
    state.addresses = initialState.addresses
    state.metamaskInstalled = initialState.metamaskInstalled
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async isMetamaskInstalled({ commit }) {
      commit('setMetamaskInstalled', await isMetamaskInstalled())
    },

    async getAddresses(_): Promise<string[]> {
      return await getAddresses()
    },

    async connectAndConfirm({ commit }) {
      const addresses = await getAddresses()
      const [address] = addresses
      const addressConfirmation = await confirm(address)

      commit('setAddress', address)
      commit('setAddresses', addresses)
      commit('setAddressConfirmation', addressConfirmation)
    },

    async logout({ commit }) {
      await Promise.resolve(commit('logout'))
    },
  }
)
