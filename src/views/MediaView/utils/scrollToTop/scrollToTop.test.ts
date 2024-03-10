import React from 'react'
import scrollToTop from './'

describe('scrollToTop', () => {
  it('should scroll to the top when ref is provided', () => {
    const ref = { current: { scrollTop: 50 } } as React.RefObject<HTMLElement>
    scrollToTop(ref)
    expect(ref?.current?.scrollTop).toBe(0)
  })

  it('should not throw an error when ref is null', () => {
    const ref = null
    expect(() => scrollToTop(ref)).not.toThrow()
  })

  it('should not throw an error when ref is undefined', () => {
    const ref = undefined
    expect(() => scrollToTop(ref)).not.toThrow()
  })

  it('should not throw an error when ref.current is null', () => {
    const ref = { current: null }
    expect(() => scrollToTop(ref)).not.toThrow()
  })
})
