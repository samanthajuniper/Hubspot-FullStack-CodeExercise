import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

interface MediaMediaTypeRadioGroupProps {
  value?: string
  onChange: (type: string) => void
}

const MediaTypeRadioGroup: React.FC<MediaMediaTypeRadioGroupProps> = ({
  value,
  onChange,
}) => {
  return (
    <FormControl sx={{ margin: '8px', width: '300px' }}>
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

export default React.memo(MediaTypeRadioGroup)
