<template>
  <v-card class="w-full lg:w-1/3">
    <template slot="title"> Connect to your MetaMask wallet </template>
    <div
      class="block hover:bg-gray-200 rounded-lg cursor-pointer"
      @click="handleClickOnMetamaskConnect"
    >
      <div class="flex items-center px-4 py-4 sm:px-6">
        <div class="min-w-0 flex-1 flex items-center">
          <div class="flex-shrink-0 mr-4">
            <v-icon-metamask class="w-12 h-12" />
          </div>
          <div
            class="
              min-w-0
              flex-1
              px-4
              md:grid md:grid-cols-1 md:gap-2
              text-left
            "
          >
            <div class="flex items-center">
              <p
                class="
                  text-xl
                  font-semibold
                  text-gray-700
                  dark:text-gray-200
                  truncate
                "
              >
                Metamask
              </p>
              <div class="flex items-center text-xs ml-2 text-blue-500">
                <a
                  href="https://metamask.io/download"
                  target="_blank"
                  rel="noreferrer"
                >
                  Download
                </a>
                <v-icon-arrow class="transform rotate-180 w-3 h-3 ml-1" />
              </div>
            </div>
            <p
              class="flex items-center text-sm text-gray-700 dark:text-gray-200"
            >
              <span class="truncate">Connect using browser wallet</span>
            </p>
          </div>
        </div>
        <div>
          <v-icon-caret-down
            class="
              transform
              -rotate-90
              h-5
              w-5
              text-gray-700
              dark:text-gray-200
            "
          />
        </div>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import VCard from '~/components/elements/card.vue'
import VIconMetamask from '~/components/icons/metamask.vue'
import VIconArrow from '~/components/icons/arrow.vue'
import VIconCaretDown from '~/components/icons/caret-down.vue'

export default Vue.extend({
  components: {
    VCard,
    VIconCaretDown,
    VIconArrow,
    VIconMetamask,
  },

  methods: {
    handleClickOnMetamaskConnect() {
      this.$accessor.wallet
        .connectAndConfirm()
        .then(() => {
          this.$toast.success('You have successfully connected to your wallet')
          this.$router.push({ name: 'index' })
        })
        .catch(() => {
          this.$toast.success(
            'Something happened while connecting to your wallet'
          )
        })
    },
  },
})
</script>
