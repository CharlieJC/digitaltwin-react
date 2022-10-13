import { Grid, Button, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import LoginForm from '../components/login-form'

function LoginPage() {
  return (
    <Grid container spacing={2} style={{ textAlign: 'center' }}>
      <Grid item xs={12} style={{ textAlign: 'start' }}>
        <Button component={RouterLink} to='/'>
          Back
        </Button>
      </Grid>
      <Grid item xs={12}>
        <h2>Login to your account!</h2>
      </Grid>
      <Grid item xs={12}>
        <LoginForm />
      </Grid>
      <Grid item xs={12}>
        <p>
          Don&apost have an account?{' '}
          <Link component={RouterLink} to='/register'>
            Create account
          </Link>
        </p>
      </Grid>
    </Grid>
  )
}

export default LoginPage
