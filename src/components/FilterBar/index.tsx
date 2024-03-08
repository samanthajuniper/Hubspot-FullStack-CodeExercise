import React, { useCallback } from 'react'
import Stack from '@mui/material/Stack'
import MultiSelectCheckmarks from '../MultiSelect'
import { Action, State } from '../../views/MediaView'
import SearchInput from '../SearchInput'

const genreOptions = ['action', 'adventure', 'comedy']
const yearsOptions = ['1981', '1987']

interface FilterBarProps {
  dispatch: React.Dispatch<Action>
  state: State
}

const FilterBar: React.FC<FilterBarProps> = ({ dispatch, state }) => {
  const { genres, years, searchText } = state

  const handleGenresChange = useCallback((selectedOptions: string[]) => {
    dispatch({ type: 'SET_GENRES', payload: selectedOptions })
  }, [])

  const handleYearsChange = useCallback((selectedOptions: string[]) => {
    dispatch({ type: 'SET_YEARS', payload: selectedOptions })
  }, [])

  const handleSearchTextChange = useCallback((searchTerm: string) => {
    dispatch({ type: 'SET_SEARCH_TEXT', payload: searchTerm })
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
        </div>
        <div>
          <SearchInput
            defaultValue={searchText}
            onChange={handleSearchTextChange}
          />
        </div>
      </Stack>
    </>
  )
}

export default React.memo(FilterBar)
