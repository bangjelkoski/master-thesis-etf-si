import { UiImage } from '~/types'
import { marketplaceContract } from '~/app/web3/contract'

export const fetchImages = async (): Promise<UiImage[]> => {
  const images = (await marketplaceContract.fetchImages()) as any[]

  return images.map(
    ({ imagePrice, imageSeller, imageUrl, isOnActiveSale }, index) => {
      return {
        id: (index + 1).toString(),
        price: imagePrice,
        seller: imageSeller,
        url: imageUrl,
        isOnActiveSale,
      }
    }
  )
}

export const purchase = async ({
  imageId,
  price,
  address,
}: {
  imageId: string
  price: string
  address: string
}): Promise<string> => {
  try {
    return await marketplaceContract.purchaseImage({
      imageId,
      price,
      buyer: address,
    })
  } catch (e: any) {
    throw new Error(e)
  }
}

export const sell = async ({
  imageId,
  address,
  price,
}: {
  imageId: string
  address: string
  price: string
}): Promise<string> => {
  try {
    return await marketplaceContract.sellExistingImage({
      imageId,
      price,
      seller: address,
    })
  } catch (e: any) {
    throw new Error(e)
  }
}
