import React, { useCallback } from 'react'
import Stack from '@mui/material/Stack'
import MultiSelectCheckmarks from '../FilterControls/MultiSelect'

import { Button } from '@mui/material'
import {
  MediaFilterActionTypes,
  MediaFilterState,
} from '../../types/interfaces/MediaFiltersReducer'
import MediaTitleSearchInput from '../FilterControls/MediaTitleSearchInput'
import MediaTypeRadioGroup from '../FilterControls/MediaTypeRadioGroup'

const genreOptions = ['action', 'adventure', 'comedy']
const yearsOptions = ['1981', '1987']

interface FilterBarProps {
  dispatch: ({ type, payload }: { type: any; payload?: any }) => void
  state: MediaFilterState
}

const FilterBar: React.FC<FilterBarProps> = ({ dispatch, state }) => {
  const { genres, years, searchText, type } = state

  const createFilterHandler = <K extends keyof MediaFilterState, T>(
    type: MediaFilterActionTypes,
    key?: K,
    transformPayload?: (key: string) => T | null,
  ) => {
    return useCallback(
      (value: any) => {
        const payloadValue = transformPayload ? transformPayload(value) : value
        dispatch({
          type,
          payload: payloadValue && key ? { [key]: payloadValue } : {},
        })
      },
      [dispatch, type, key, transformPayload],
    )
  }
  const handleYearsChange = createFilterHandler(
    MediaFilterActionTypes.SET_YEARS,
    'years',
  )

  const handleGenresChange = createFilterHandler(
    MediaFilterActionTypes.SET_GENRES,
    'genres',
  )

  const handleSearchTextChange = createFilterHandler(
    MediaFilterActionTypes.SET_SEARCH_TEXT,
    'searchText',
  )

  const handleTypeChange = createFilterHandler(
    MediaFilterActionTypes.SET_TYPE,
    'type',
    (selectedType: string) => (selectedType === 'all' ? null : selectedType),
  )

  const handleClearFilters = createFilterHandler(
    MediaFilterActionTypes.CLEAR_FILTERS,
  )

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
          <MediaTypeRadioGroup
            value={!type ? 'all' : type}
            onChange={handleTypeChange}
          />
        </div>
        <div>
          <Stack spacing={6} alignItems="flex-end">
            <MediaTitleSearchInput
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
