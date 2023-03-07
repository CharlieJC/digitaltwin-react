import { Paper, Grid, Link, Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ConnectFormController from '../../controllers/connect/connect-form-controller'
import PageWrapper from '../../page-wrapper'

function ConnectPage() {
  return (
    <PageWrapper>
      <Grid container direction='column' justifyContent='center' alignItems='center'>
        <Grid item xs={12}>
          <img src='logo500x175.png' alt='Logo' />
        </Grid>
        <Grid item xs={12}>
          <h2>Enter code to connect!</h2>
        </Grid>
        <Grid item xs={12}>
          <ConnectFormController />
        </Grid>
        <Grid item xs={12}>
          <p>
            Create your own twin?{' '}
            <Link component={RouterLink} to='/login'>
              Sign in here {process.env.REACT_APP_TESTING}
            </Link>
          </p>
        </Grid>
      </Grid>
    </PageWrapper>
  )
}

export default ConnectPage
