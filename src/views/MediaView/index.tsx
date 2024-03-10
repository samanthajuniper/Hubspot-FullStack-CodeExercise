import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useRef,
} from 'react'
import FilterBar from '../../components/FilterBar'
import MediaCard from '../../components/MediaCard'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import NoResultsMessage from '../../components/NoResultsMessage'
import fetchMedia from './utils/fetchMedia'
import {
  FetchMediaResponse,
  MediaItem,
  PaginationInfo,
} from '../../types/interfaces/MediaData'
import {
  MediaFilterActionTypes,
  MediaFilterDispatchParams,
  MediaFilterState,
} from '../../types/interfaces/MediaFiltersReducer'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import MediaPagination from '../../components/Pagination'

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
      console.log('clearing')
      return {
        ...initialMediaFilterState,
      }
    default:
      return state
  }
}

const handleScrollToTop = (ref: React.RefObject<HTMLElement> | null) => {
  if (ref && ref.current) {
    ref.current.scrollTop = 0
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
  const mediaContainerRef = useRef<HTMLElement | null>(null)

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
        setMediaData(data?.media)
        setPagination(data?.paginationInfo)
      }

      setLoading(false)
    }

    handleFetchMediaData()

    return () => {
      ignore = true
    }
  }, [state])

  const handlePageChange = useCallback((pageNumber: number) => {
    handleScrollToTop(mediaContainerRef)
    dispatch({
      type: MediaFilterActionTypes.SET_CURRENT_PAGE,
      payload: { currentPage: pageNumber },
    })
  }, [])

  const handleChangeRowsPerPage = useCallback((limit: string) => {
    handleScrollToTop(mediaContainerRef)
    dispatch({
      type: MediaFilterActionTypes.SET_LIMIT,
      payload: { limit: parseInt(limit) },
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
      <FilterBar dispatch={dispatch} state={state} />
      {!mediaData?.length && (
        <NoResultsMessage message="No items matched your search." />
      )}
      {error && (
        <NoResultsMessage
          message={`Error: ${error} Please refresh to try again.`}
        />
      )}
      <Box
        // sx={{ width: 'fit-content' }}
        ref={mediaContainerRef}
        sx={{ width: 'fit-content', height: '780px', overflow: 'scroll' }}
      >
        <Grid
          container
          spacing={3}
          display="flex"
          justifyContent="space-around"
          sx={{ marginTop: '5px' }}
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
      {pagination && (
        <MediaPagination
          handlePageChange={handlePageChange}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
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
