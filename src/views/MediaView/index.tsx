import React, { useState, useEffect, useReducer } from 'react'
import FilterBar from '../../components/FilterBar'
import MediaCard from '../../components/MediaCard'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import NoResultsMessage from '../../components/NoResultsMessage'
import { FetchMediaResponse, MediaItem } from '../../types/interfaces/MediaData'
import fetchMedia from './utils/fetchMedia'
import {
  MediaFilterAction,
  MediaFilterState,
} from '../../types/interfaces/MediaFiltersReducer'

const initialMediaFilterState: MediaFilterState = {
  years: [],
  genres: [],
  searchText: '',
  type: '',
  // limit: 5,
  // offset: 0,
}

const mediaFiltersReducer = (
  state: MediaFilterState,
  action: MediaFilterAction,
): MediaFilterState => {
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
      return {
        ...initialMediaFilterState,
        offset: state.offset,
        limit: state.limit,
      }
    default:
      return state
  }
}

const MediaView = () => {
  const [state, dispatch] = useReducer(
    mediaFiltersReducer,
    initialMediaFilterState,
  )
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [mediaData, setMediaData] = useState<MediaItem[] | null>(null)
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
    return <NoResultsMessage message={error} />
  }

  if (loading) {
    return <div>loading</div>
  }

  return (
    <div>
      <FilterBar dispatch={dispatch} state={state} />
      {!mediaData?.length && (
        <NoResultsMessage message="No items matched your search." />
      )}
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
