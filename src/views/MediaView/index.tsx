import React, { useState, useEffect, useReducer } from 'react'
import fetchMedia, { FetchMediaResponse, MediaItem } from './utils/fetchMedia'
interface State {
  years?: string[]
  genres?: string[]
  searchText?: string
  type?: string
  limit?: number
  offset?: number
}

type Action =
  | { type: 'SET_YEARS'; payload: string[] }
  | { type: 'SET_GENRES'; payload: string[] }
  | { type: 'SET_SEARCH_TEXT'; payload: string }
  | { type: 'SET_TYPE'; payload: string }
  | { type: 'SET_LIMIT'; payload: number }
  | { type: 'SET_OFFSET'; payload: number }

const initialState: State = {
  years: [],
  genres: [],
  searchText: '',
  type: '',
  limit: 5,
  offset: 0,
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_YEARS':
      return { ...state, years: action.payload }
    case 'SET_GENRES':
      return { ...state, genres: action.payload }
    case 'SET_SEARCH_TEXT':
      return { ...state, searchText: action.payload }
    case 'SET_TYPE':
      return { ...state, type: action.payload }
    case 'SET_LIMIT':
      return { ...state, limit: action.payload }
    case 'SET_OFFSET':
      return { ...state, offset: action.payload }
    default:
      return state
  }
}

const MediaView = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [mediaData, setMediaData] = useState<MediaItem[] | null>(null)
  // const [pagination, setPagination] = useState<PaginationInfo | null>(null)

  useEffect(() => {
    let ignore = false

    const handleFetchMedia = async () => {
      setLoading(true)
      setError(null)

      const { error, data }: FetchMediaResponse = await fetchMedia(state)

      if (ignore) {
        return
      } else if (error) {
        setError(error)
      } else {
        setMediaData(data)

        /* TODO: add pagination in when API is fixed */
        // setPagination(pagination)
      }

      setLoading(false)
    }

    handleFetchMedia()

    return () => {
      ignore = true
    }
  }, [state])

  {
    /* TODO: add pagination in when API is fixed */
  }
  // const handlePageChange = (newOffset: number) => {
  //   dispatch({ type: 'SET_OFFSET', payload: newOffset })
  // }

  if (error) {
    return <div>{error}</div>
  }

  if (loading) {
    return <div>loading</div>
  }

  return (
    <div>
      <ul>
        {mediaData?.map(item => {
          return <li key={item.id}>{item.title}</li>
        })}
      </ul>
      {/* TODO: add pagination in when API is fixed */}
      {/* {pagination && (
        <div>
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
          >
            Previous
          </button>
          <span>{`Page ${pagination.currentPage} of ${pagination.totalPages}`}</span>
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
          >
            Next
          </button>
        </div>
      )} */}
    </div>
  )
}

export default MediaView

// import React, { useState, useEffect } from 'react'
// import fetchMedia, {
//   FetchMediaResponse,
//   PaginationInfo,
// } from './utils/fetchMedia'

// const MediaView = () => {
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [mediaData, setMediaData] = useState<any[] | null>(null)
//   const [pagination, setPagination] = useState<PaginationInfo | null>(null)

//   useEffect(() => {
//     let ignore = false

//     const handleFetchMedia = async (offset?: number) => {
//       setLoading(true)
//       setError(null)

//       const { error, data, pagination }: FetchMediaResponse = await fetchMedia({
//         years: ['1993'],
//       })

//       if (ignore) {
//         return
//       } else if (error) {
//         setError(error)
//       } else {
//         setMediaData(data)
//         setPagination(pagination)
//       }

//       setLoading(false)
//     }

//     handleFetchMedia()

//     return () => {
//       ignore = true
//     }
//   }, []) // Empty dependency array for initial load

//   const handlePageChange = (newOffset: number) => {
//     handleFetchMedia({ offset: newOffset })
//   }

//   if (error) {
//     return <div>{error}</div>
//   }

//   if (loading) {
//     return <div>loading</div>
//   }

//   return (
//     <div>
//       <ul>
//         {mediaData?.map(item => {
//           return <li key={item.id}>{item.title}</li>
//         })}
//       </ul>
//       {pagination && (
//         <div>
//           <button
//             onClick={() => handlePageChange(pagination.currentPage - 1)}
//             disabled={pagination.currentPage === 1}
//           >
//             Previous
//           </button>
//           <span>{`Page ${pagination.currentPage} of ${pagination.totalPages}`}</span>
//           <button
//             onClick={() => handlePageChange(pagination.currentPage + 1)}
//             disabled={pagination.currentPage === pagination.totalPages}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default MediaView
