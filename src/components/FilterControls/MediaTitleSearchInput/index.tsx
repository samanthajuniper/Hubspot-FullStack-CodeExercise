import React, { useEffect } from 'react'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import useDebounce from '../../../hooks/useDebounce'

interface MediaTitleSearchInputProps {
  defaultValue?: string
  onChange: (searchTerm: string) => void
}

const MediaTitleSearchInput: React.FC<MediaTitleSearchInputProps> = ({
  defaultValue,
  onChange,
}) => {
  const [searchTerm, setSearchTerm] = React.useState<string | undefined>()
  const debouncedSearchTerm = useDebounce(searchTerm, 400)

  useEffect(() => {
    setSearchTerm(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    if (debouncedSearchTerm || debouncedSearchTerm === '') {
      onChange(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <TextField
        label="Title Search"
        onChange={handleChange}
        value={searchTerm}
      />
    </FormControl>
  )
}

export default React.memo(MediaTitleSearchInput)
