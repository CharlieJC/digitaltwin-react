// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function RegisterForm() {
  const navigate = useNavigate()

  const handleRegister = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const user = {
      email: (form.email as HTMLInputElement).value,
      username: (form.username as HTMLInputElement).value,
      password: (form.password as HTMLInputElement).value,
    }

    fetch(`${process.env.REACT_APP_API_HOST}api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: user.email,
        username: user.username,
        password: user.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate('/login')
      })
  }

  return (
    <Box display='flex' justifyContent='center' alignItems='center' sx={{ display: 'flex' }}>
      <form onSubmit={(event) => handleRegister(event)}>
        <Grid container spacing={2} style={{}}>
          <Grid item xs={12}>
            <Box sx={{ flexDirection: 'column', display: 'flex' }}>
              <TextField id='email' label='Email' variant='outlined' />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ flexDirection: 'column', display: 'flex' }}>
              <TextField id='username' label='Username' variant='outlined' />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
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

export default RegisterForm
