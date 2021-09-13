import { Middleware, Context } from '@nuxt/types'

const connectPageRoute = 'connect'

const connectedMiddleware: Middleware = ({ app, redirect, route }: Context) => {
  const routeIsNotConnect = route.name && route.name !== connectPageRoute
  const routeIsConnect = route.name && route.name === connectPageRoute
  const isUserWalletConnected = app.$accessor.wallet.isUserWalletConnected

  if (isUserWalletConnected && routeIsConnect) {
    return redirect('/')
  }

  if (!isUserWalletConnected && routeIsNotConnect) {
    return redirect('/connect')
  }
}

export default connectedMiddleware
