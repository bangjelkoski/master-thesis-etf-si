<template>
  <div>
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 w-full">
          <div class="flex items-center">
            <div class="flex-shrink-0 text-blue-500">
              <img class="h-8 w-8" src="/logo.svg?v2" alt="ImgMarkt" />
            </div>
            <div class="">
              <div class="ml-10 flex items-baseline space-x-4">
                <nuxt-link
                  class="
                    text-gray-300
                    hover:bg-gray-700 hover:text-white
                    px-3
                    py-2
                    rounded
                  "
                  to="/"
                  exact
                >
                  Marketplace
                </nuxt-link>
                <nuxt-link
                  class="
                    text-gray-300
                    hover:bg-gray-700 hover:text-white
                    px-3
                    py-2
                    rounded
                  "
                  to="/wallet"
                >
                  Wallet
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="">
            <div class="ml-4 flex items-center md:ml-6 text-gray-300">
              <span class="font-mono text-xs mr-2">{{ formattedAddress }}</span>
              <div @click="logout">
                <v-icon-exit class="block cursor-pointer w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">
          <portal-target name="title"></portal-target>
        </h1>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { formatWalletAddress } from '@injectivelabs/utils'
import VIconExit from '~/components/icons/exit.vue'

export default Vue.extend({
  components: {
    VIconExit,
  },

  computed: {
    address(): string {
      return this.$accessor.wallet.address
    },

    formattedAddress(): string {
      const { address } = this

      return formatWalletAddress(address)
    },
  },

  methods: {
    logout() {
      Promise.all([this.$accessor.wallet.logout()]).then(() => {
        this.$toasted.success(
          'You have successfully disconnected from your wallet'
        )
        this.$router.push({ name: 'connect' })
      })
    },
  },
})
</script>
