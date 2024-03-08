export interface MediaItem {
  id: number
  title: string
  year: string
  genre: string
  type: string
  poster: string
}

interface FetchMediaProps {
  years?: string[]
  genres?: string[]
  searchText?: string
  type?: string
  limit?: number
  offset?: number
}

/* TODO: add pagination in when API is fixed */
// export interface PaginationInfo {
//   totalRecords: number
//   totalPages: number
//   currentPage: number
//   pageSize: number
// }

export interface FetchMediaResponse {
  error: string | null
  data: MediaItem[] | null
  //   pagination: PaginationInfo | null
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
    console.log('Fetching data')
    const response = await fetch(endpoint, { method: 'GET' })

    console.log('response', response)

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Fetched Data:', data)

    return { error: null, data }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'error',
      data: null,
    }
  }
}

export default fetchMedia
