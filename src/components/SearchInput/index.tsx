import React from 'react'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import useDebounce from '../../hooks/useDebounce'

interface SearchInputProps {
  defaultValue?: string
  onChange: (searchTerm: string) => void
}

const SearchInput: React.FC<SearchInputProps> = ({
  defaultValue,
  onChange,
}) => {
  const [searchTerm, setSearchTerm] = React.useState<string | null>()
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  React.useEffect(() => {
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
        defaultValue={defaultValue}
      />
    </FormControl>
  )
}

export default React.memo(SearchInput)
