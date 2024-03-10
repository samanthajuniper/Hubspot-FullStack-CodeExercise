import React, { useCallback, useEffect, useRef } from 'react'
import Stack from '@mui/material/Stack'
import MultiSelectCheckmarks from '../FilterControls/MultiSelect'

import { Button } from '@mui/material'
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
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      <div>
        <Stack direction="row" spacing={2}>
          <MultiSelectCheckmarks
            options={genreOptions}
            defaultOptions={genres || []}
            onClose={handleGenresChange}
            label="genres"
          />
          <MultiSelectCheckmarks
            options={yearOptions}
            defaultOptions={years || []}
            onClose={handleYearsChange}
            label="years"
          />
        </Stack>
        <MediaTypeRadioGroup
          value={!type ? 'all' : type}
          onChange={handleTypeChange}
        />
      </div>

      <Stack spacing={6} alignItems="flex-end">
        <MediaTitleSearchInput
          onChange={handleSearchTextChange}
          ref={searchInputRef}
        />
        <Button variant="outlined" onClick={handleClearFilters}>
          Clear All Filters
        </Button>
      </Stack>
    </Stack>
  )
}

export default React.memo(FilterBar)
