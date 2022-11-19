// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

import { TextField, Button, Grid, Box } from '@mui/material'

type LoginFormProps = {
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void
}
const LoginForm = (props: LoginFormProps) => {
  const { handleLogin } = props

  return (
    <Box display='flex' justifyContent='center' alignItems='center' sx={{ display: 'flex' }}>
      <form onSubmit={(event) => handleLogin(event)}>
        <Grid container spacing={2} style={{}}>
          <Grid item xs={12}>
            <Box sx={{ flexDirection: 'column', display: 'flex' }}>
              <TextField id='email' label='Email' variant='outlined' />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ flexDirection: 'column', display: 'flex' }}>
              <TextField
                id='password'
                label='Password'
                variant='outlined'
                inputProps={{ type: 'password' }}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ flexDirection: 'column', display: 'flex' }}>
              <Button variant='outlined' type='submit'>
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default LoginForm
