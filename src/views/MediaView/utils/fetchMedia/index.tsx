import { FetchMediaResponse } from '../../../../types/interfaces/MediaData'

interface FetchMediaProps {
  years?: string[]
  genres?: string[]
  searchText?: string
  type?: string
  limit?: number
  offset?: number
}

const fetchMedia = async (
  props: FetchMediaProps = {},
): Promise<FetchMediaResponse> => {
  const { years, genres, searchText, type, limit, offset } = props

  //   @ts-ignore
  const queryParams = new URLSearchParams({
    ...(years?.length && { years: years.join(',') }),
    ...(genres?.length && { genres: genres.join(',') }),
    ...(searchText && { searchText }),
    ...(type && { type }),
    ...(limit && { limit }),
    ...(offset && { offset }),
  })

  const endpoint = `http://localhost:3001/?${queryParams}`

  try {
    const response = await fetch(endpoint, { method: 'GET' })
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
