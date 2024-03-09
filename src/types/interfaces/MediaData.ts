export interface MediaItem {
  id: number
  title: string
  year: string
  genre: string
  type: string
  poster: string
}

/* TODO: add pagination in when API is fixed */
// export interface PaginationData {
//   totalRecords: number
//   totalPages: number
//   currentPage: number
//   pageSize: number
// }

export interface FetchMediaResponse {
  error: string | null
  data: MediaItem[] | null
  //   pagination: PaginationData | null
}
