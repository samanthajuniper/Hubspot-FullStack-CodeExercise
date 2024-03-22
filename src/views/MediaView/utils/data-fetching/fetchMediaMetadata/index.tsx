import { FetchMediaMetadataResponse } from '../../../../../types/interfaces/MediaData'

const fetchMediaMetadata = async (): Promise<FetchMediaMetadataResponse> => {
  const mediaMetadataEndpoint = `${process.env.REACT_APP_API_BASE_URL}metadata`

  try {
    const response = await fetch(mediaMetadataEndpoint, { method: 'GET' })
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`)
    }

    const data = await response.json()
    return { error: null, data }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'error',
      data: null,
    }
  }
}

export default fetchMediaMetadata
