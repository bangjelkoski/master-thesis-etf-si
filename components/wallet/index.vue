<template>
  <div
    class="
      mt-8
      grid grid-cols-1
      gap-y-12
      sm:grid-cols-2 sm:gap-x-6
      lg:grid-cols-4
      xl:gap-x-8
    "
  >
    <v-image
      v-for="image in images"
      :key="`image-${image.id}`"
      :image="image"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VImage from '../elements/image.vue'
import { UiImage } from '~/types'

export default Vue.extend({
  components: {
    VImage,
  },

  computed: {
    images(): UiImage[] {
      return this.$accessor.marketplace.ownedImages
    },
  },
})
</script>
