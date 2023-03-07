import { Grid, Button, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import LoginFormController from '../../controllers/login/login-form-controller'
import PageWrapper from '../../page-wrapper'

function LoginPage() {
  return (
    <PageWrapper>
      <Button component={RouterLink} to='/'>
        Back
      </Button>

      <Grid container direction='column' justifyContent='center' alignItems='center'>
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
    </PageWrapper>
  )
}

export default LoginPage
