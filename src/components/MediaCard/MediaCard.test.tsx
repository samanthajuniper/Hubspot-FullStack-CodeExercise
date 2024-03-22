import React from 'react'
import { render, screen } from '@testing-library/react'
import MediaCard from '.'
import { MediaItem } from '../../types/interfaces/MediaData'

describe('<MediaCard />', () => {
  const renderMediaCard = (props: Omit<MediaItem, 'id'>) => {
    render(<MediaCard {...props} />)
    const { getByText, getByAltText } = screen
    const titleElement = getByText(`${props.title} (${props.year})`)
    const genreElement = getByText(`Genres ${props.genre}`)
    const imageElement = getByAltText(`${props.title} ${props.type} cover`)
    return {
      titleElement,
      genreElement,
      imageElement,
    }
  }

  it('renders <MediaCard /> with the provided props', () => {
    const mockMediaItem = {
      title: 'Test Title',
      year: '2022',
      genre: 'Action',
      poster: 'https://example.com/poster.jpg',
      type: 'Movie',
    }

    const { titleElement, genreElement, imageElement } =
      renderMediaCard(mockMediaItem)

    expect(titleElement).toBeInTheDocument()
    expect(genreElement).toBeInTheDocument()
    expect(imageElement).toBeInTheDocument()
    expect(imageElement).toHaveAttribute('src', mockMediaItem.poster)
  })
})
