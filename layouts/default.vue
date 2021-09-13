<template>
  <div class="w-full h-full min-h-screen bg-dark-100 relative flex flex-col">
    <v-header />
    <main class="flex-1">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <client-only>
          <nuxt />
        </client-only>
      </div>
    </main>
    <v-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VHeader from '~/components/layout/header.vue'
import VFooter from '~/components/layout/footer.vue'

export default Vue.extend({
  components: {
    VHeader,
    VFooter,
  },

  data() {
    return {
      //
    }
  },

  mounted() {
    //
  },

  destroyed() {},
})
</script>
