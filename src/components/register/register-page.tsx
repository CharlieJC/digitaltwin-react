import { Link as RouterLink } from 'react-router-dom'
import { Grid, Button } from '@mui/material'
import RegisterFormController from '../../controllers/register/register-form-controller'
import PageWrapper from '../../page-wrapper'

function RegisterPage() {
  return (
    <PageWrapper>
      <Button component={RouterLink} to='/login'>
        Back
      </Button>
      <Grid container direction='column' justifyContent='center' alignItems='center'>
        <Grid item xs={12}>
          <img src='logo500x175.png' alt='Logo' />
        </Grid>
        <Grid item xs={12}>
          <h2>Create a new account!</h2>
        </Grid>
        <Grid item xs={12}>
          <RegisterFormController />
        </Grid>
      </Grid>
    </PageWrapper>
  )
}

export default RegisterPage
