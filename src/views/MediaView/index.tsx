import React, { useState, useEffect, useReducer, useCallback } from 'react'
import fetchMedia, { FetchMediaResponse, MediaItem } from './utils/fetchMedia'
import FilterBar from '../../components/FilterBar'
import MediaCard from '../../components/MediaCard'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'

export interface State {
  years?: string[]
  genres?: string[]
  searchText?: string
  type?: string
  limit?: number
  offset?: number
}

export type Action =
  | { type: 'SET_YEARS'; payload: string[] }
  | { type: 'SET_GENRES'; payload: string[] }
  | { type: 'SET_SEARCH_TEXT'; payload: string }
  | { type: 'SET_TYPE'; payload: string }
  | { type: 'SET_LIMIT'; payload: number }
  | { type: 'SET_OFFSET'; payload: number }
  | { type: 'CLEAR_FILTERS' }

const initialState: State = {
  years: [],
  genres: [],
  searchText: '',
  type: '',
  // limit: 5,
  // offset: 0,
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_YEARS':
      return { ...state, years: action.payload }
    case 'SET_GENRES':
      return { ...state, genres: action.payload }
    case 'SET_SEARCH_TEXT':
      return { ...state, searchText: action.payload }
    case 'SET_TYPE':
      return { ...state, type: action.payload }
    case 'SET_LIMIT':
      return { ...state, limit: action.payload }
    case 'SET_OFFSET':
      return { ...state, offset: action.payload }
    case 'CLEAR_FILTERS':
      return { ...initialState, offset: state.offset, limit: state.limit }
    default:
      return state
  }
}

const MediaView = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [mediaData, setMediaData] = useState<MediaItem[] | null>(null)
  console.log('🚀 ~ MediaView ~ mediaData:', mediaData)
  // const [pagination, setPagination] = useState<PaginationInfo | null>(null)

  useEffect(() => {
    const handleFetchMedia = async () => {
      setLoading(true)
      setError(null)

      const { error, data }: FetchMediaResponse = await fetchMedia(state)

      if (error) {
        setError(error)
      } else {
        setMediaData(data)

        /* TODO: add pagination in when API is fixed */
        // setPagination(pagination)
      }

      setLoading(false)
    }

    handleFetchMedia()
  }, [state])

  {
    /* TODO: add pagination in when API is fixed */
  }
  // const handlePageChange = (newOffset: number) => {
  //   dispatch({ type: 'SET_OFFSET', payload: newOffset })
  // }
  // @ts-ignore
  // const handleFilterChange = React.useCallback(
  //   ({ type, payload }) => {
  //     console.log('in the callback')
  //     dispatch({ type, payload })
  //   },
  //   [dispatch],
  // )

  if (error) {
    return <div>{error}</div>
  }

  if (loading) {
    return <div>loading</div>
  }

  return (
    <div>
      <FilterBar dispatch={dispatch} state={state} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
        >
          {mediaData?.map(item => {
            return (
              <Grid xs={2} sm={4} md={4} key={item.id}>
                <MediaCard
                  title={item.title}
                  year={item.year}
                  genre={item.genre}
                  poster={item.poster}
                  type={item.type}
                />
              </Grid>
            )
          })}
        </Grid>
      </Box>

      {/* TODO: add pagination in when API is fixed */}
      {/* {pagination && (
        <div>
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
          >
            Previous
          </button>
          <span>{`Page ${pagination.currentPage} of ${pagination.totalPages}`}</span>
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
          >
            Next
          </button>
        </div>
      )} */}
    </div>
  )
}

export default MediaView
