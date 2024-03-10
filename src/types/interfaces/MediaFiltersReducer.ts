export interface MediaFilterState {
  years?: string[]
  genres?: string[]
  searchText?: string
  type?: string
  limit?: number
  currentPage?: number
}

export enum MediaFilterActionTypes {
  SET_GENRES = 'SET_GENRES',
  SET_YEARS = 'SET_YEARS',
  SET_SEARCH_TEXT = 'SET_SEARCH_TEXT',
  SET_TYPE = 'SET_TYPE',
  CLEAR_FILTERS = 'CLEAR_FILTERS',
  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
  SET_LIMIT = 'SET_LIMIT',
}

export type MediaFilterDispatchParams =
  | {
      type: MediaFilterActionTypes.SET_YEARS
      payload: { [key: string]: string[] }
    }
  | {
      type: MediaFilterActionTypes.SET_GENRES
      payload: { [key: string]: string[] }
    }
  | {
      type: MediaFilterActionTypes.SET_SEARCH_TEXT
      payload: { [key: string]: string }
    }
  | {
      type: MediaFilterActionTypes.SET_TYPE
      payload: { [key: string]: string }
    }
  | {
      type: MediaFilterActionTypes.SET_CURRENT_PAGE
      payload: { [key: string]: number }
    }
  | {
      type: MediaFilterActionTypes.SET_LIMIT
      payload: { limit: number }
    }
  | { type: MediaFilterActionTypes.CLEAR_FILTERS }
