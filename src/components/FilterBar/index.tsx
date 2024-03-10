import React, { useCallback, useEffect, useRef } from 'react'
import Stack from '@mui/material/Stack'
import MultiSelectCheckmarks from '../FilterControls/MultiSelect'

import { Button, useMediaQuery, useTheme } from '@mui/material'
import { MediaFilterState } from '../../types/interfaces/MediaFiltersReducer'
import MediaTitleSearchInput from '../FilterControls/MediaTitleSearchInput'
import MediaTypeRadioGroup from '../FilterControls/MediaTypeRadioGroup'

interface FilterBarProps {
  dispatch: ({ type, payload }: { type: any; payload?: any }) => void
  state: MediaFilterState
  goToFirstPage: () => void
  genreOptions: string[] | []
  yearOptions: string[] | []
}

const FilterBar: React.FC<FilterBarProps> = ({
  dispatch,
  state,
  goToFirstPage,
  genreOptions,
  yearOptions,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { genres, years, type } = state
  const searchInputRef = useRef<HTMLInputElement | null>(null)

  const handleGenresChange = useCallback((selectedOptions: string[]) => {
    dispatch({ type: 'SET_GENRES', payload: { genres: selectedOptions } })
    goToFirstPage()
  }, [])

  const handleYearsChange = useCallback((selectedOptions: string[]) => {
    dispatch({ type: 'SET_YEARS', payload: { years: selectedOptions } })
    goToFirstPage()
  }, [])

  const handleSearchTextChange = useCallback((searchTerm: string) => {
    dispatch({ type: 'SET_SEARCH_TEXT', payload: { searchText: searchTerm } })
    goToFirstPage()
  }, [])

  const handleTypeChange = useCallback((type: string) => {
    dispatch({
      type: 'SET_TYPE',
      payload: { type: type === 'all' ? null : type },
    })
    goToFirstPage()
  }, [])

  const handleClearFilters = useCallback(() => {
    dispatch({ type: 'CLEAR_FILTERS' })

    if (searchInputRef && searchInputRef.current) {
      searchInputRef.current.value = ''
    }
  }, [])

  return (
    <Stack
      direction="column"
      justifyContent={isMobile ? 'center' : 'space-between'}
      alignItems={isMobile ? 'center' : 'unset'}
    >
      <Stack
        direction={isMobile ? 'column' : 'row'}
        justifyContent="space-between"
      >
        <Stack direction={isMobile ? 'column' : 'row'}>
          <MultiSelectCheckmarks
            options={genreOptions}
            defaultValue={genres || []}
            onClose={handleGenresChange}
            label="genres"
          />
          <MultiSelectCheckmarks
            options={yearOptions}
            defaultValue={years || []}
            onClose={handleYearsChange}
            label="years"
          />
        </Stack>
        <MediaTitleSearchInput
          onChange={handleSearchTextChange}
          ref={searchInputRef}
        />
      </Stack>

      <Stack
        component="div"
        direction={isMobile ? 'column' : 'row'}
        justifyContent={isMobile ? 'unset' : 'space-between'}
        sx={{ padding: '0 7px', width: isMobile ? '300px' : 'unset' }}
      >
        <MediaTypeRadioGroup
          value={!type ? 'all' : type}
          onChange={handleTypeChange}
        />
        <Button
          variant="outlined"
          onClick={handleClearFilters}
          sx={{
            height: '40px',
            marginTop: isMobile ? '15px' : '8px',
            marginBottom: '4px',
            width: '200px',
          }}
        >
          Clear All Filters
        </Button>
      </Stack>
    </Stack>
  )
}

export default React.memo(FilterBar)
