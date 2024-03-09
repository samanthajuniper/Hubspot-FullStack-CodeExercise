import { render, screen } from '@testing-library/react'
import App from './App'

describe('<App />', () => {
  const renderApp = () => {
    render(<App />)
    const { getByTestId } = screen
    const mediaViewComponent = getByTestId('media-view')
    return {
      mediaViewComponent,
    }
  }

  it('renders the page withe MediaView/>', () => {
    const { mediaViewComponent } = renderApp()
    expect(mediaViewComponent).toBeInTheDocument()
  })
})
