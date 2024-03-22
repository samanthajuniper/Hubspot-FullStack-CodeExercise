import { FetchMediaProps } from '..'

// use props to build query params for fetchMedia
const buildFetchMediaEndpoint = (props: FetchMediaProps): string => {
  const { years, genres, searchText, type, limit, currentPage } = props

  const queryParams = new URLSearchParams({
    ...(years?.length && { years: years.join(',') }),
    ...(genres?.length && { genres: genres.join(',') }),
    ...(searchText && { searchText }),
    ...(type && { type }),
    ...(currentPage && { currentPage }),
    ...(limit && { limit }),
  } as Record<string, string>)

  const queryString = queryParams.toString()
  const baseUrl = process.env.REACT_APP_API_BASE_URL || ''

  return queryString ? `${baseUrl}?${queryString}` : baseUrl
}

export default buildFetchMediaEndpoint
