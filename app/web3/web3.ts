import { sleep } from '@injectivelabs/utils'
import Eip1993Provider from 'eip1193-provider'
import $Web3 from 'web3'
import { CHAIN_ID } from '../constants'

export interface Eip1993ProviderWithMetamask extends Eip1993Provider {
  isMetaMask: boolean
}

export interface WindowWithEip1193Provider extends Window {
  ethereum: Eip1993ProviderWithMetamask
}

const $window = window as unknown as WindowWithEip1193Provider

export class Web3 {
  private ethereum: Eip1993ProviderWithMetamask

  private chainId: string

  constructor(chainId: string = CHAIN_ID) {
    this.ethereum = $window.ethereum
    this.chainId = chainId
  }

  async getAddresses(): Promise<string[]> {
    try {
      return await this.ethereum.request({
        method: 'eth_requestAccounts',
      })
    } catch (e: any) {
      throw new Error(e.message)
    }
  }

  async confirm(address: string): Promise<string> {
    try {
      return await this.ethereum.request({
        method: 'personal_sign',
        params: [address, `Confirmation for ${address} at time: ${Date.now()}`],
      })
    } catch (e: any) {
      throw new Error(e.message)
    }
  }

  async sendTransaction(transaction: unknown): Promise<string> {
    try {
      return await this.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transaction],
      })
    } catch (e: any) {
      throw new Error(e.message)
    }
  }

  async getNetworkId(): Promise<string> {
    try {
      return await this.ethereum.request({ method: 'net_version' })
    } catch (e: any) {
      throw new Error(e.message)
    }
  }

  async getChainId(): Promise<string> {
    try {
      return await this.ethereum.request({ method: 'eth_chainId' })
    } catch (e: any) {
      throw new Error(e.message)
    }
  }
}

export const getRevertReason = async (txHash: string) => {
  const web3 = new $Web3(window.ethereum as any) as $Web3
  const tx = await web3.eth.getTransaction(txHash)
  // @ts-ignore
  let result = await web3.eth.call(tx, tx.blockNumber)

  result = result.startsWith('0x') ? result : `0x${result}`

  if (result && result.substr(138)) {
    const reason = web3.utils.toAscii(result.substr(138))
    // eslint-disable-next-line no-console
    throw new Error(reason)
  } else {
    throw new Error('Cannot get reason - No return value')
  }
}

export const getTransactionReceipt = async (
  txHash: string
): Promise<string> => {
  const interval = 1000
  const web3 = new $Web3(window.ethereum as any) as $Web3
  const transactionReceiptRetry = async () => {
    const receipt = await web3.eth.getTransactionReceipt(txHash)

    if (!receipt) {
      await sleep(interval)
      await transactionReceiptRetry()
    }

    return receipt
  }

  try {
    const { transactionHash } = await transactionReceiptRetry()

    return transactionHash
  } catch (e: any) {
    throw new Error(e.message)
  }
}
