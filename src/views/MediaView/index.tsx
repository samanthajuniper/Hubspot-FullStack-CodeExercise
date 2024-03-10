import { useState, useEffect, useReducer, useCallback, useRef } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack'

import fetchMedia from './utils/data-fetching/fetchMedia'
import fetchMediaMetadata from './utils/data-fetching/fetchMediaMetadata'
import FilterBar from '../../components/FilterBar'
import MediaCard from '../../components/MediaCard'
import MediaPagination from '../../components/MediaPagination'
import NoResultsMessage from '../../components/NoResultsMessage'
import scrollToTop from './utils/scrollToTop'

import {
  FetchMediaMetadataResponse,
  FetchMediaResponse,
  MediaItem,
  PaginationInfo,
} from '../../types/interfaces/MediaData'
import {
  MediaFilterActionTypes,
  MediaFilterDispatchParams,
  MediaFilterState,
} from '../../types/interfaces/MediaFiltersReducer'

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
    case 'SET_CURRENT_PAGE':
    case 'SET_LIMIT':
      return { ...state, ...action.payload }
    case 'CLEAR_FILTERS':
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
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [genreOptions, setGenreOptions] = useState<string[] | []>([])
  const [yearOptions, setYearOptions] = useState<string[] | []>([])
  const mediaContainerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    let ignore = false
    const handleFetchMediaMetaData = async () => {
      setLoading(true)
      setError(null)
      const { error, data }: FetchMediaMetadataResponse =
        await fetchMediaMetadata()
      if (ignore) {
        return
      } else if (error || !data) {
        setError(error)
      } else {
        setGenreOptions(data.genres ?? [])
        setYearOptions(data.years ?? [])
      }
      setLoading(false)
    }
    handleFetchMediaMetaData()
    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    let ignore = false

    const handleFetchMediaData = async () => {
      setLoading(true)
      setError(null)
      const { error, data }: FetchMediaResponse = await fetchMedia(state)

      if (ignore) {
        return
      } else if (error || !data) {
        setError(error)
      } else {
        setMediaData(data.media)
        setPagination(data.paginationInfo)
      }

      setLoading(false)
    }

    handleFetchMediaData()

    return () => {
      ignore = true
    }
  }, [state])

  const handlePageChange = useCallback((pageNumber: number) => {
    scrollToTop(mediaContainerRef)
    dispatch({
      type: MediaFilterActionTypes.SET_CURRENT_PAGE,
      payload: { currentPage: pageNumber },
    })
  }, [])

  const handleChangeItemsPerPage = useCallback((limit: string) => {
    scrollToTop(mediaContainerRef)
    dispatch({
      type: MediaFilterActionTypes.SET_LIMIT,
      payload: { limit: parseInt(limit) },
    })
  }, [])

  // use when a new filter is applied
  // example: user is on page 3 of results > new filter added > now only 2 pages of results
  const goToFirstPage = useCallback(() => {
    scrollToTop(mediaContainerRef)
    dispatch({
      type: MediaFilterActionTypes.SET_CURRENT_PAGE,
      payload: { currentPage: 1 },
    })
  }, [])

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
      <FilterBar
        dispatch={dispatch}
        state={state}
        goToFirstPage={goToFirstPage}
        genreOptions={genreOptions}
        yearOptions={yearOptions}
      />
      {!mediaData?.length && !error && (
        <NoResultsMessage message="No items matched your search." />
      )}
      {error && (
        <NoResultsMessage
          message={`Error: ${error} Please refresh to try again.`}
        />
      )}
      <Box
        ref={mediaContainerRef}
        sx={{
          width: 'fit-content',
          height: 'calc(100vh - 320px)',
          overflow: 'scroll',
        }}
      >
        <Grid
          container
          spacing={3}
          display="flex"
          justifyContent="center"
          sx={{ marginTop: '5px' }}
        >
          {mediaData?.map(item => (
            <Grid xs={4} key={item.id} width="fit-content">
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
      {pagination && (
        <MediaPagination
          handlePageChange={handlePageChange}
          handleChangeItemsPerPage={handleChangeItemsPerPage}
          page={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalRecords={pagination.totalRecords}
          pageSize={pagination.pageSize}
        />
      )}
    </Stack>
  )
}

export default MediaView
