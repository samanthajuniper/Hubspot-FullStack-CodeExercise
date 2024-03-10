export interface MediaItem {
  id: number
  title: string
  year: string
  genre: string
  type: string
  poster: string
}
export interface PaginationInfo {
  totalRecords: number
  totalPages: number
  currentPage: number
  pageSize: number
}

export interface FetchMediaResponse {
  error: string | null
  data: {
    media: MediaItem[] | null
    paginationInfo: PaginationInfo | null
  } | null
}
export interface FetchMediaMetadataResponse {
  error: string | null
  data: {
    genres: string[] | null
    years: string[] | null
  } | null
}
