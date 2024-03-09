import { renderHook, act } from '@testing-library/react'
import useDebounce from '.'

describe('useDebounce', () => {
  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initialValue', 300))
    expect(result.current).toBe('initialValue')
  })

  it('updates the debounced value after the delay', async () => {
    jest.useFakeTimers()

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initialValue', delay: 300 },
      },
    )

    // Initial render, the debounced value should be the initial value
    expect(result.current).toBe('initialValue')

    // Trigger a rerender with a new value
    rerender({ value: 'updatedValue', delay: 300 })

    // Debounced value should not change immediately
    expect(result.current).toBe('initialValue')

    // Fast-forward time by 300ms
    act(() => {
      jest.advanceTimersByTime(300)
    })

    // After 300ms, the debounced value should be the updated value
    expect(result.current).toBe('updatedValue')

    jest.useRealTimers()
  })

  it('clears the timeout on unmount', () => {
    jest.useFakeTimers()

    const { unmount } = renderHook(() => useDebounce('value', 300))

    // Unmount the component
    unmount()

    // Fast-forward time by 300ms
    act(() => {
      jest.advanceTimersByTime(300)
    })

    jest.useRealTimers()
  })
})
