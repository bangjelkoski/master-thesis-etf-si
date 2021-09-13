<template>
  <div>
    <portal to="title"> Marketplace </portal>
    <v-home />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VHome from '~/components/home/index.vue'

export default Vue.extend({
  components: {
    VHome,
  },

  mounted() {
    this.$accessor.marketplace.fetchImages()
  },
})
</script>
