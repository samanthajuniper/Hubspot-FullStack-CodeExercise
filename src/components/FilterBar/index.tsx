import React, { useCallback } from 'react'
import { Stack } from '@mui/material'
import MultiSelectCheckmarks from '../MultiSelect'
import { Action, State } from '../../views/MediaView'

const genreOptions = ['action', 'adventure', 'comedy']
const yearsOptions = ['1981', '1987']

interface FilterBarProps {
  dispatch: React.Dispatch<Action>
  state: State
}

const FilterBar: React.FC<FilterBarProps> = ({ dispatch, state }) => {
  const { genres, years } = state

  const handleGenresChange = useCallback((selectedOptions: string[]) => {
    dispatch({ type: 'SET_GENRES', payload: selectedOptions })
  }, [])

  const handleYearsChange = useCallback((selectedOptions: string[]) => {
    dispatch({ type: 'SET_YEARS', payload: selectedOptions })
  }, [])

  return (
    <Stack direction="row" spacing={2}>
      <MultiSelectCheckmarks
        options={genreOptions}
        selectedOptions={genres || []}
        onClose={handleGenresChange}
        label="genres"
      />
      <MultiSelectCheckmarks
        options={yearsOptions}
        selectedOptions={years || []}
        onClose={handleYearsChange}
        label="years"
      />
    </Stack>
  )
}

export default React.memo(FilterBar)
