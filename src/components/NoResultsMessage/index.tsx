import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

const StyledPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}))

const NoResultsMessage: React.FC = () => (
  <StyledPaper elevation={2}>
    <h3> No items matched your search.</h3>
  </StyledPaper>
)

export default NoResultsMessage
