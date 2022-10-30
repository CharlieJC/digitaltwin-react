// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

import { TextField, Button, Grid, Box } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

const connectForm = () => {
  const navigate = useNavigate()

  const handleConnect = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const code = Number((form.code as HTMLInputElement).value)

    fetch(`${process.env.REACT_APP_API_HOST}api/twins/validcode`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: String(code),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid === true) {
          navigate('/twin')
        }
      })
  }

  return (
    <Box display='flex' justifyContent='center' alignItems='center' sx={{ display: 'flex' }}>
      <form onSubmit={(event) => handleConnect(event)}>
        <Grid container spacing={2} style={{}}>
          <Grid item xs={12}>
            <Box sx={{ flexDirection: 'column', display: 'flex' }}>
              <TextField id='code' label='Twin Code' variant='outlined' />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ flexDirection: 'column', display: 'flex' }}>
              <Button variant='outlined' type='submit'>
                Connect
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default connectForm
