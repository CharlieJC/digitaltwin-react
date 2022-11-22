import { Grid, Link, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ConnectFormController from '../../controllers/connect/connect-form-controller'

function ConnectPage() {
  return (
    <div>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
        style={{ minHeight: '100vh' }}
      >
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
    </div>
  )
}

export default ConnectPage
