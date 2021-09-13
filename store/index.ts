import { getAccessorType } from 'typed-vuex'

import * as wallet from '~/store/wallet'
import * as marketplace from '~/store/marketplace'

export const accessorType = getAccessorType({
  modules: {
    wallet,
    marketplace,
  },
})
