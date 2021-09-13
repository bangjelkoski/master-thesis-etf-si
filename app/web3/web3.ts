import Eip1993Provider from 'eip1193-provider'
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
