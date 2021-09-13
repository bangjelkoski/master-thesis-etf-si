<template>
  <div class="w-full h-screen flex justify-center items-center">
    <v-metamask />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VMetamask from '~/components/connect/metamask.vue'

export default Vue.extend({
  components: {
    VMetamask,
  },

  layout: 'blank',
})
</script>
