import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { CircularProgress, Alert, Grid, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { ReactElement } from 'react'
import Map from '../components/map'
import SwipeableEdgeDrawer from '../components/map-drawer'

function TwinPage() {
  // Auckland center
  const center = { lat: -36.848461, lng: 174.763336 }
  // zoom to cbd
  const zoom = 12

  const render = (status: Status): ReactElement => {
    if (status === Status.FAILURE)
      return <Alert severity='error'>This is an error alert — check it out!</Alert>
    return <CircularProgress />
  }

  return (
    <Grid container spacing={2} style={{ textAlign: 'center' }}>
      <Grid item xs={12} style={{ textAlign: 'start' }}>
        <Button component={RouterLink} to='/'>
          Exit
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Wrapper
          apiKey={process.env.REACT_APP_GOOGLE_API_KEY ? process.env.REACT_APP_GOOGLE_API_KEY : ''}
          render={render}
        >
          <Map center={center} zoom={zoom} />
        </Wrapper>
      </Grid>
      <Grid item xs={12}>
        <SwipeableEdgeDrawer />
      </Grid>
    </Grid>
  )
}

export default TwinPage
