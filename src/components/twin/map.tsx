import React, { useRef, useEffect, useState } from 'react'
import { Button, Box, useMediaQuery } from '@mui/material'
import SwipeableEdgeDrawer from './twin-drawer-small'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCES_TOKEN

const Map: React.FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(174.7645)
  const [lat, setLat] = useState(-36.8509)
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    const style = prefersDarkMode
      ? 'mapbox://styles/mapbox/dark-v11'
      : 'mapbox://styles/mapbox/light-v11'

    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style,
      center: [lng, lat],
      zoom,
    })
  })

  return (
    <div>
      <Box sx={{ zIndex: 1, position: 'absolute', m: 1 }}>
        <Button variant='outlined'>Exit</Button>
      </Box>
      <div ref={mapContainer} style={{ height: '100vh' }} className='map-container' />

      <SwipeableEdgeDrawer />
    </div>
  )
}

export default Map
