import { Paper, Box } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}
const PageWrapper = (props: Props) => {
  const { children } = props
  return (
    <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
      <Box sx={{ my: 'auto' }}>
        <Paper
          elevation={10}
          sx={{
            width: 'fit-content',
            height: 'fit-content',
          }}
        >
          {children}
        </Paper>
      </Box>
    </Box>
  )
}
export default PageWrapper
