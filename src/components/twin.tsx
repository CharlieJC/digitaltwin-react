import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { CircularProgress, Alert, Box, Paper } from '@mui/material'
import * as React from 'react'
import { ReactElement } from 'react'
import SwipeableEdgeDrawer from './twin/twin-drawer-small'
import Map from './twin/map'

function TwinPage() {
  const [value, setValue] = React.useState(0)
  // Auckland center
  const center = { lat: -36.848461, lng: 174.763336 }
  // zoom to cbd
  const zoom = 18

  const mapId = process.env.REACT_APP_MAP_ID

  const render = (status: Status): ReactElement => {
    if (status === Status.FAILURE)
      return <Alert severity='error'>This is an error alert — check it out!</Alert>
    return <CircularProgress />
  }

  return <Map />
}

export default TwinPage
