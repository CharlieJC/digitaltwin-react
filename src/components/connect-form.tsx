// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

import { TextField, Button, Grid, Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const connectForm = () => (
  <Box display='flex' justifyContent='center' alignItems='center' sx={{ display: 'flex' }}>
    <form>
      <Grid container spacing={2} style={{}}>
        <Grid item xs={12}>
          <Box sx={{ flexDirection: 'column', display: 'flex' }}>
            <TextField id='code' label='Twin Code' variant='outlined' />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ flexDirection: 'column', display: 'flex' }}>
            <Button component={RouterLink} variant='outlined' to='/twin'>
              Connect
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  </Box>
)

export default connectForm
