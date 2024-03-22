import { FetchMediaResponse } from '../../../../../types/interfaces/MediaData'
import buildFetchMediaEndpoint from './buildFetchMediaEndpoint'

export interface FetchMediaProps {
  years?: string[]
  genres?: string[]
  searchText?: string
  type?: string
  limit?: number
  currentPage?: number
}

const fetchMedia = async (
  props: FetchMediaProps = {},
): Promise<FetchMediaResponse> => {
  const getMediaEndpoint = buildFetchMediaEndpoint(props)

  try {
    const response = await fetch(getMediaEndpoint, { method: 'GET' })
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

export default fetchMedia
