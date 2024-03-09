import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { MediaItem } from '../../views/MediaView/utils/fetchMedia'

const MediaCard: React.FC<Omit<MediaItem, 'id'>> = ({
  title,
  year,
  genre,
  poster,
  type,
}) => {
  const handleImageError = e => {
    e.target.onerror = null
    e.target.src = `https://placehold.co/400x590?text=No+Image&font=roboto`
  }

  return (
    <Card sx={{ width: 400, height: 700 }}>
      <CardMedia
        component="img"
        alt={`${title} ${type} cover`}
        image={poster}
        height="590"
        onError={handleImageError}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${title} (${year})`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Genres ${genre}`}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default React.memo(MediaCard)
