export interface MediaFilterState {
  years?: string[]
  genres?: string[]
  searchText?: string
  type?: string
  limit?: number
  offset?: number
}

export type MediaFilterAction =
  | { type: 'SET_YEARS'; payload: string[] }
  | { type: 'SET_GENRES'; payload: string[] }
  | { type: 'SET_SEARCH_TEXT'; payload: string }
  | { type: 'SET_TYPE'; payload: string }
  | { type: 'SET_LIMIT'; payload: number }
  | { type: 'SET_OFFSET'; payload: number }
  | { type: 'CLEAR_FILTERS' }
