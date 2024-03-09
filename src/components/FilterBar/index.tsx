import React, { useCallback } from 'react'
import Stack from '@mui/material/Stack'
import MultiSelectCheckmarks from '../MultiSelect'
import SearchInput from '../SearchInput'
import MediaRadioGroup from '../RadioGroup'
import { Button } from '@mui/material'
import {
  MediaFilterAction,
  MediaFilterState,
} from '../../types/interfaces/MediaFiltersReducer'

const genreOptions = ['action', 'adventure', 'comedy']
const yearsOptions = ['1981', '1987']

interface FilterBarProps {
  dispatch: React.Dispatch<MediaFilterAction>
  state: MediaFilterState
}

const FilterBar: React.FC<FilterBarProps> = ({ dispatch, state }) => {
  const { genres, years, searchText, type } = state

  const handleGenresChange = useCallback((selectedOptions: string[]) => {
    dispatch({ type: 'SET_GENRES', payload: selectedOptions })
  }, [])

  const handleYearsChange = useCallback((selectedOptions: string[]) => {
    dispatch({ type: 'SET_YEARS', payload: selectedOptions })
  }, [])

  const handleSearchTextChange = useCallback((searchTerm: string) => {
    dispatch({ type: 'SET_SEARCH_TEXT', payload: searchTerm })
  }, [])

  const handleTypeChange = useCallback((type: string) => {
    // TODO:
    // @ts-ignore
    dispatch({ type: 'SET_TYPE', payload: type === 'all' ? null : type })
  }, [])

  const handleClearFilters = useCallback(() => {
    dispatch({ type: 'CLEAR_FILTERS' })
  }, [])

  return (
    <>
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
              options={yearsOptions}
              defaultOptions={years || []}
              onClose={handleYearsChange}
              label="years"
            />
          </Stack>
          <MediaRadioGroup
            value={!type ? 'all' : type}
            onChange={handleTypeChange}
          />
        </div>
        <div>
          <Stack spacing={6} alignItems="flex-end">
            <SearchInput
              defaultValue={searchText}
              onChange={handleSearchTextChange}
            />
            <Button variant="outlined" onClick={handleClearFilters}>
              Clear All Filters
            </Button>
          </Stack>
        </div>
      </Stack>
    </>
  )
}

export default React.memo(FilterBar)
