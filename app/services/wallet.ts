import detectEthereumProvider from '@metamask/detect-provider'
import { web3 } from '~/app/web3'

export const getAddresses = async (): Promise<string[]> => {
  const addresses = await web3.getAddresses()

  if (addresses.length === 0) {
    throw new Error('There are no addresses linked in this wallet.')
  }

  return addresses
}

export const confirm = async (address: string) => {
  try {
    return await web3.confirm(address)
  } catch (e: any) {
    throw new Error(e.message)
  }
}

export const isMetamaskInstalled = async (): Promise<boolean> => {
  const provider = await detectEthereumProvider()

  return !!provider
}
