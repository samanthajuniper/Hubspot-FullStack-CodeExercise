export interface MediaFilterState {
  years?: string[]
  genres?: string[]
  searchText?: string
  type?: string
  limit?: number
  offset?: number
}

export enum MediaFilterActionTypes {
  SET_GENRES = 'SET_GENRES',
  SET_YEARS = 'SET_YEARS',
  SET_SEARCH_TEXT = 'SET_SEARCH_TEXT',
  SET_TYPE = 'SET_TYPE',
  CLEAR_FILTERS = 'CLEAR_FILTERS',
}

export type MediaFilterDispatchParams =
  | { type: MediaFilterActionTypes.SET_YEARS; payload: string[] }
  | { type: MediaFilterActionTypes.SET_GENRES; payload: string[] }
  | { type: MediaFilterActionTypes.SET_SEARCH_TEXT; payload: string }
  | { type: MediaFilterActionTypes.SET_TYPE; payload: string }
  | { type: MediaFilterActionTypes.CLEAR_FILTERS }
