import React, { useState, useEffect } from 'react'
import fetchMedia from './utils/fetchMedia'

const MediaView = () => {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [mediaData, setMediaData] = useState<any[] | null>(null)

  React.useEffect(() => {
    let ignore = false

    const handleFetchMedia = async () => {
      setLoading(true)
      setError(null)

      const { error, response } = await fetchMedia({ years: ['1993'] })

      if (ignore) {
        return
      } else if (error) {
        setError(error)
      } else {
        setMediaData(response)
      }

      setLoading(false)
    }

    handleFetchMedia()

    return () => {
      ignore = true
    }
  }, [])

  if (error) {
    return <div>{error}</div>
  }

  if (loading) {
    return <div>loading</div>
  }

  return (
    <ul>
      {mediaData?.map(item => {
        return <li key={item.id}>{item.title}</li>
      })}
    </ul>
  )
}

export default MediaView
