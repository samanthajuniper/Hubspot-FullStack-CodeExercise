import React from 'react'

// util for scrolling the top of the element into view
const scrollToTop = (ref: React.RefObject<HTMLElement> | null | undefined) => {
  if (ref && ref.current) {
    ref.current.scrollTop = 0
  }
}

export default scrollToTop
