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

export const purchase = async (imageId: string): Promise<string> => {
  return await Promise.resolve(imageId)
}

export const sell = async (imageId: string): Promise<string> => {
  return await Promise.resolve(imageId)
}
