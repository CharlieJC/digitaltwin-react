import { Grid, Link, Button, IconButton } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DashboardTwinController from '../../controllers/dashboard/dashboard-twin-controller'
import { Twin } from '../../models/dashboard-model'

type DashboardPageProps = {
  twins: Twin[] | undefined
  onCreate: () => void
  refresh: () => void
}
const DashboardPage = (props: DashboardPageProps) => {
  const { twins, onCreate, refresh } = props
  return (
    <div>
      <Button component={RouterLink} to='/' style={{ position: 'absolute' }}>
        Exit
      </Button>
      <Grid
        container
        direction='column'
        justifyContent='top'
        alignItems='center'
        style={{ minHeight: '100vh', paddingTop: '20px' }}
      >
        {twins?.map((twin) => (
          <Grid item key={twin.id} xs={12} sx={{ p: 1 }}>
            <DashboardTwinController code={twin.code} id={twin.id} refresh={refresh} />
          </Grid>
        ))}

        <Grid item xs={12} sx={{ p: 1 }}>
          <IconButton size='large' onClick={onCreate}>
            <AddCircleIcon fontSize='inherit' />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  )
}

export default DashboardPage
