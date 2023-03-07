import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import PageWrapper from '../../page-wrapper'

type TwinProps = {
  code: number
  onConnect: () => void
  onDelete: () => void
}

const DashboardTwin = (props: TwinProps) => {
  const { code, onConnect, onDelete } = props

  return (
    <PageWrapper>
      <Card sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component='div' variant='h5'>
              Twin ID: {code}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <Button variant='text' type='submit' onClick={onConnect}>
              Connect
            </Button>
            <Button variant='text' type='submit' onClick={onDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </Card>
    </PageWrapper>
  )
}

export default DashboardTwin
