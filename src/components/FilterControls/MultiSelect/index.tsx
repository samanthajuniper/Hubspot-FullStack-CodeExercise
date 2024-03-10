import React, { useState, useEffect } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'

interface MultiSelectProps {
  options: string[]
  defaultValue: string[]
  onClose: (selectedOptions: string[]) => void
  label: string
}

const MultiSelectCheckmarks: React.FC<MultiSelectProps> = ({
  options,
  defaultValue,
  onClose,
  label,
}) => {
  const [internalSelectedOptions, setInternalSelectedOptions] =
    useState<string[]>(defaultValue)

  useEffect(() => {
    setInternalSelectedOptions(defaultValue)
  }, [defaultValue])

  const handleChange = (
    event: SelectChangeEvent<typeof internalSelectedOptions>,
  ) => {
    const {
      target: { value },
    } = event
    const selectedValues = typeof value === 'string' ? value.split(',') : value
    setInternalSelectedOptions(selectedValues)
  }

  const handleClose = () => {
    onClose(internalSelectedOptions)
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={`multi-select-checkbox-label-${label}`}>
          {label}
        </InputLabel>
        <Select
          labelId={`multi-select-checkbox-label-${label}`}
          id={`multi-select-checkbox-${label}`}
          multiple
          value={internalSelectedOptions}
          defaultValue={defaultValue}
          onChange={handleChange}
          onClose={handleClose}
          input={<OutlinedInput label={label} />}
          renderValue={selected => (selected as string[]).join(', ')}
        >
          {options.map(option => (
            <MenuItem key={option} value={option}>
              <Checkbox
                checked={internalSelectedOptions.indexOf(option) > -1}
              />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default React.memo(MultiSelectCheckmarks)
