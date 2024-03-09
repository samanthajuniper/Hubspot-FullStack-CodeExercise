import React, { useState, useEffect, useReducer, useCallback } from 'react'
import FilterBar from '../../components/FilterBar'
import MediaCard from '../../components/MediaCard'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import NoResultsMessage from '../../components/NoResultsMessage'
import fetchMedia from './utils/fetchMedia'
import { FetchMediaResponse, MediaItem } from '../../types/interfaces/MediaData'
import {
  MediaFilterDispatchParams,
  MediaFilterState,
} from '../../types/interfaces/MediaFiltersReducer'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

const initialMediaFilterState: MediaFilterState = {
  years: [],
  genres: [],
  searchText: '',
  type: '',
}

const mediaFiltersReducer = (
  state: MediaFilterState,
  action: MediaFilterDispatchParams,
): MediaFilterState => {
  switch (action.type) {
    case 'SET_YEARS':
    case 'SET_GENRES':
    case 'SET_SEARCH_TEXT':
    case 'SET_TYPE':
      return { ...state, ...action.payload }
    case 'CLEAR_FILTERS':
      console.log('clearing')
      return {
        ...initialMediaFilterState,
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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>()
  const [mediaData, setMediaData] = useState<MediaItem[] | null>(null)

  useEffect(() => {
    let ignore = false

    const handleFetchMediaData = async () => {
      setLoading(true)
      setError(null)

      const { error, data }: FetchMediaResponse = await fetchMedia(state)

      if (ignore) {
        return
      } else if (error) {
        setError(error)
      } else {
        setMediaData(data)
      }

      setLoading(false)
    }

    handleFetchMediaData()

    return () => {
      ignore = true
    }
  }, [state])

  const memoizedDispatch: ({
    type,
    payload,
  }: {
    type: any
    payload?: any
  }) => void = useCallback(
    ({ type, payload }) => {
      dispatch({ type, payload })
    },
    [dispatch],
  )

  return (
    <Stack data-testid="media-view" flexDirection="column">
      {loading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <FilterBar dispatch={memoizedDispatch} state={state} />
      {!mediaData?.length && (
        <NoResultsMessage message="No items matched your search." />
      )}
      {error && (
        <NoResultsMessage
          message={`Error: ${error} Please refresh to try again.`}
        />
      )}
      <Box sx={{ width: 'fit-content' }}>
        <Grid
          container
          spacing={3}
          display="flex"
          justifyContent="space-around"
        >
          {mediaData?.map(item => (
            <Grid
              xs={4}
              key={item.id}
              width="fit-content"
              justifyContent="space-around"
            >
              <MediaCard
                title={item.title}
                year={item.year}
                genre={item.genre}
                poster={item.poster}
                type={item.type}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  )
}

export default MediaView
