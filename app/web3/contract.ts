import Web3 from 'web3'
import {
  CONTRACT_ADDRESS,
  DEFAULT_GAS_PRICE,
  DEFAULT_GAS_LIMIT,
} from '../constants'

const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'imagesContract_',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'imageFromId',
    outputs: [
      {
        internalType: 'string',
        name: 'imageUrl',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'imagePrice',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'imageSeller',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'isOnActiveSale',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'imagesContract',
    outputs: [
      {
        internalType: 'contract IERC721',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'ownedImages',
    outputs: [
      {
        internalType: 'uint256',
        name: 'head',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'tail',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'totalIds',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'imageUrl',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
    ],
    name: 'sellNewImage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'imageId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
    ],
    name: 'sellExistingImage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'imageId',
        type: 'uint256',
      },
    ],
    name: 'cancelSellingOfImage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'imageId',
        type: 'uint256',
      },
    ],
    name: 'purchaseImage',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'getOwnedImages',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
]

class MarketplaceContract {
  private contract: any // The contract instance

  private web3: Web3

  constructor() {
    this.web3 = new Web3(window.ethereum as any) as Web3
    this.web3.eth.handleRevert = true
    this.contract = new this.web3.eth.Contract(abi as any, CONTRACT_ADDRESS)
  }

  async sellExistingImage({
    imageId,
    price,
    seller,
  }: {
    imageId: string
    price: string
    seller: string
  }) {
    try {
      return await this.contract.methods
        .sellExistingImage(imageId, price)
        .send({
          from: seller,
          gasPrice: DEFAULT_GAS_PRICE,
          gas: DEFAULT_GAS_LIMIT, // TODO: use gas estimation
        })
    } catch (e: any) {
      throw new Error(e.message)
    }
  }

  async purchaseImage({
    imageId,
    price,
    buyer,
  }: {
    imageId: string
    price: string
    buyer: string
  }) {
    try {
      return await this.contract.methods.purchaseImage(imageId).send({
        from: buyer,
        value: price,
        gasPrice: DEFAULT_GAS_PRICE,
        gas: DEFAULT_GAS_LIMIT, // TODO: use gas estimation
      })
    } catch (e: any) {
      throw new Error(e.message)
    }
  }

  async fetchImages() {
    const images = []
    try {
      const latestId = await this.contract.methods.totalIds().call()

      for (let i = 1; i <= latestId; i++) {
        try {
          images.push(await this.contract.methods.imageFromId(i).call())
        } catch (e: any) {
          throw new Error(e.message)
        }
      }
    } catch (e: any) {
      throw new Error(e.message)
    }

    return images
  }
}

export const marketplaceContract = new MarketplaceContract()
