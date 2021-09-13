<template>
  <div>
    <portal to="title"> Wallet </portal>
    <v-wallet />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VWallet from '~/components/wallet/index.vue'

export default Vue.extend({
  components: {
    VWallet,
  },

  mounted() {
    this.$accessor.marketplace.fetchImages()
  },
})
</script>
