import React, { forwardRef, useEffect, ForwardedRef } from 'react'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { debounce } from '@mui/material'

interface MediaTitleSearchInputProps {
  onChange: (searchTerm: string) => void
}

const MediaTitleSearchInput = forwardRef(
  (
    { onChange }: MediaTitleSearchInputProps,
    ref: ForwardedRef<HTMLInputElement | null>,
  ) => {
    const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    }, 400)

    return (
      <FormControl sx={{ m: 1, width: 300 }}>
        <TextField
          inputRef={ref}
          label="Title Search"
          onChange={handleChange}
        />
      </FormControl>
    )
  },
)

export default React.memo(MediaTitleSearchInput)
