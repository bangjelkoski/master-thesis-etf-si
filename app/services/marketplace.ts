import { UiImage } from '~/types'
import { marketplaceContract } from '~/app/web3/contract'

export const fetchImages = async (): Promise<UiImage[]> => {
  const images = await marketplaceContract.fetchImages()

  console.log(images)

  return []
}

export const purchase = async (imageId: string): Promise<string> => {
  return await Promise.resolve(imageId)
}

export const sell = async (imageId: string): Promise<string> => {
  return await Promise.resolve(imageId)
}
