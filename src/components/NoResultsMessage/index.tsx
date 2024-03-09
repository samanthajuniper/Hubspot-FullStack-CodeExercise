import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

const StyledPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}))

const NoResultsMessage: React.FC<{ message: string }> = ({ message }) => (
  <StyledPaper elevation={2}>
    <h3>{message}</h3>
  </StyledPaper>
)

export default NoResultsMessage
