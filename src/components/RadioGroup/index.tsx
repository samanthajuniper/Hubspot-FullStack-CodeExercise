import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

interface MediaRadioGroupProps {
  value?: string
  onChange: (type: string) => void
}

const MediaRadioGroup: React.FC<MediaRadioGroupProps> = ({
  value,
  onChange,
}) => {
  return (
    <FormControl sx={{ m: 2 }}>
      <FormLabel id="media-type-group">Media Type</FormLabel>
      <RadioGroup
        row
        aria-labelledby="media-type-group"
        name="row-radio-buttons-group"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <FormControlLabel value="all" control={<Radio />} label="All" />
        <FormControlLabel value="movie" control={<Radio />} label="Movies" />
        <FormControlLabel value="book" control={<Radio />} label="Books" />
      </RadioGroup>
    </FormControl>
  )
}

export default React.memo(MediaRadioGroup)
