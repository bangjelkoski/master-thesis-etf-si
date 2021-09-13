<template>
  <div>
    <div class="relative">
      <div class="relative w-full h-72 rounded-lg overflow-hidden">
        <img
          :src="image.url"
          :alt="image.url"
          class="w-full h-full object-center object-cover"
        />
      </div>
      <div class="relative mt-4">
        <h3
          class="
            text-sm
            font-medium
            text-gray-900
            flex
            items-center
            justify-between
          "
        >
          Image {{ image.id }}
          <span
            v-if="isOwnedByAddress"
            class="uppercase text-xs text-blue font-semibold"
          >
            Owned!
          </span>
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          <strong>Owned by: </strong> {{ imageSellerAddress }}
        </p>
      </div>
      <div
        class="
          absolute
          top-0
          inset-x-0
          h-72
          rounded-lg
          p-4
          flex
          items-end
          justify-end
          overflow-hidden
        "
      >
        <div
          aria-hidden="true"
          class="
            absolute
            inset-x-0
            bottom-0
            h-36
            bg-gradient-to-t
            from-black
            opacity-50
          "
        ></div>
        <p class="relative text-lg font-semibold text-white">
          {{ imagePrice }}ETH
        </p>
      </div>
    </div>
    <div v-if="isOwnedByAddress" class="mt-6">
      <a
        class="
          relative
          flex
          bg-gray-100
          border border-transparent
          rounded-md
          py-2
          px-8
          items-center
          justify-center
          text-sm
          font-medium
          text-gray-900
          hover:bg-gray-200
          cursor-pointer
        "
        @click.prevent="onPurchase"
      >
        Purchase
      </a>
    </div>
    <div v-else class="mt-6">
      <a
        class="
          relative
          flex
          bg-gray-100
          border border-transparent
          rounded-md
          py-2
          px-8
          items-center
          justify-center
          text-sm
          font-medium
          text-gray-900
          hover:bg-gray-200
          cursor-pointer
        "
        @click.prevent="onSell"
      >
        Sell
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { BigNumberInWei, formatWalletAddress } from '@injectivelabs/utils'
import Vue, { PropType } from 'vue'
import { UiImage } from '~/types'

export default Vue.extend({
  props: {
    image: {
      required: true,
      type: Object as PropType<UiImage>,
    },
  },

  computed: {
    address(): string {
      return this.$accessor.wallet.address
    },

    isOwnedByAddress(): boolean {
      const { address, image } = this

      return address.toLowerCase() === image.seller.toLowerCase()
    },

    imageSellerAddress(): string {
      const { image } = this

      return formatWalletAddress(image.seller)
    },

    imagePrice(): string {
      const { image } = this

      return new BigNumberInWei(image.price).toBase().toFixed(4)
    },
  },

  methods: {
    onPurchase() {
      //
    },

    onSell() {
      //
    },
  },
})
</script>
