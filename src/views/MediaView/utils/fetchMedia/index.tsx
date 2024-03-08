interface FetchMediaProps {
  years?: string[] // Use plural form for arrays
  genres?: string[] // Use plural form for arrays
  searchText?: string
  type?: string
  limit?: number
  offset?: number
}

interface FetchMediaResponse {
  error: string | null
  response: any // Adjust the type according to your API response structure
}

const fetchMedia = async (
  props: FetchMediaProps = {},
): Promise<FetchMediaResponse> => {
  const { years, genres, searchText, type, limit, offset } = props

  // Helper function to filter out undefined or null values
  const filterUndefined = (
    value: string | number | undefined | null,
  ): value is string | number => {
    return value !== undefined && value !== null
  }

  // Constructing the URL with query parameters
  const queryParams = new URLSearchParams(
    Object.entries({
      years: years?.join(','),
      genres: genres?.join(','),
      searchText,
      type,
      limit,
      offset,
    })
      .filter(([_, value]) => filterUndefined(value))
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
  )

  const endpoint = `http://localhost:3001/?${queryParams}`

  try {
    console.log('Fetching data')
    const response = await fetch(endpoint, {
      method: 'GET',
    })

    console.log('response', response)

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Fetched Data:', data)
    return { error: null, response: data }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'error',
      response: null,
    }
  }
}

export default fetchMedia
