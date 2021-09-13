import VueRouter from 'vue-router'
import { accessorType } from '~/store'

/**
 * Overloads VueI18n interface to avoid needing to cast return value to string.
 */
declare module 'vue-i18n/types' {
  export default class VueI18n {
    //
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter
    $accessor: typeof accessorType
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface VueConstructor<V extends Vue = Vue> {
    //
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: typeof accessorType
  }
}
