import { FetchMediaResponse } from '../../../../../types/interfaces/MediaData'

interface FetchMediaProps {
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
  const { years, genres, searchText, type, limit, currentPage } = props

  const queryParams = new URLSearchParams({
    ...(years?.length && { years: years.join(',') }),
    ...(genres?.length && { genres: genres.join(',') }),
    ...(searchText && { searchText }),
    ...(type && { type }),
    ...(currentPage && { currentPage }),
    ...(limit && { limit }),
  } as Record<string, string>)

  const getMediaEndpoint = `${process.env.REACT_APP_API_BASE_URL}?${queryParams}`

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
