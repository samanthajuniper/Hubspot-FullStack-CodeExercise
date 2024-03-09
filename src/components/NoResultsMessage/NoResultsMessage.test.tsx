import React from 'react'
import { render, screen } from '@testing-library/react'
import NoResultsMessage from './'

describe('<NoResultsMessage />', () => {
  const renderNoResultsMessage = (message: string) => {
    render(<NoResultsMessage message={message} />)
    const { getByText } = screen
    const messageElement = getByText(message)
    return {
      messageElement,
    }
  }

  it('renders <NoResultsMessage/> with the given message', () => {
    const message = 'No results found!'
    const { messageElement } = renderNoResultsMessage(message)
    expect(messageElement).toBeInTheDocument()
  })
})
