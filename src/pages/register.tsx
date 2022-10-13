import { Link as RouterLink } from 'react-router-dom'
import { Grid, Button } from '@mui/material'
import RegisterForm from '../components/register-form'

function RegisterPage() {
  return (
    <Grid container spacing={2} style={{ textAlign: 'center' }}>
      <Grid item xs={12} style={{ textAlign: 'start' }}>
        <Button component={RouterLink} to='/login'>
          Back
        </Button>
      </Grid>
      <Grid item xs={12}>
        <h2>Create a new account!</h2>
      </Grid>
      <Grid item xs={12}>
        <RegisterForm />
      </Grid>
    </Grid>
  )
}

export default RegisterPage
