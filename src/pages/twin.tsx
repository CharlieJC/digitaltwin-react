import { Wrapper, Status } from '@googlemaps/react-wrapper'
import {
  CircularProgress,
  Alert,
  Box,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import * as React from 'react'
import { ReactElement } from 'react'
import RestoreIcon from '@mui/icons-material/Restore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SwipeableEdgeDrawer from '../components/twin-drawer-small'
import Map from '../components/map'

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

  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <Wrapper apiKey={process.env.REACT_APP_GOOGLE_API_KEY || ''} render={render}>
        {/* <Button compoent={RouterLink} to='/'>
            Exit
          </Button> */}
        <Map center={center} zoom={zoom} mapId={mapId || ''} tilt={30} heading={0} />
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
          <SwipeableEdgeDrawer />

          {/* <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue)
            }}
          >
            <BottomNavigationAction label='Recents' icon={<RestoreIcon />} />
            <BottomNavigationAction label='Favorites' icon={<FavoriteIcon />} />
            <BottomNavigationAction label='Nearby' icon={<LocationOnIcon />} />
          </BottomNavigation> */}
        </Paper>
      </Wrapper>
    </Box>
  )
}

export default TwinPage
