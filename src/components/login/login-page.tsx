import { Grid, Button, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import LoginFormController from '../../controllers/login/login-form-controller'

function LoginPage() {
  return (
    <div>
      <Button component={RouterLink} to='/' style={{ position: 'absolute' }}>
        Back
      </Button>

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
          <h2>Login to your account!</h2>
        </Grid>
        <Grid item xs={12}>
          <LoginFormController />
        </Grid>
        <Grid item xs={12}>
          <p>
            Dont have an account?{' '}
            <Link component={RouterLink} to='/register'>
              Create account
            </Link>
          </p>
        </Grid>
      </Grid>
    </div>
  )
}

export default LoginPage
