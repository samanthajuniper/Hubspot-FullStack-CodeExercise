import { ThemeProvider, createTheme } from '@mui/material'
import MediaView from '../views/MediaView'
import '../styles/globals.css'

const theme = createTheme({
  typography: {
    fontFamily: 'LexendDecaLight, Helvetica Neue, helvetica, arial, sans-serif',
  },
})

const App = () => (
  <ThemeProvider theme={theme}>
    <MediaView />
  </ThemeProvider>
)

export default App
