import React from 'react'
import * as THREE from 'three'
import { ThreeJSOverlayView, latLngToVector3Relative } from '@googlemaps/three'
import { useNavigate } from 'react-router-dom'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Button, Paper } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import * as ReactDOM from 'react-dom/client'
import axios from 'axios'

interface MapProps extends google.maps.MapOptions {
  center: google.maps.LatLngLiteral
  zoom: number
  mapId: string
  tilt: number
  heading: number
}

const Map: React.FC<MapProps> = (props: MapProps) => {
  const url = `${process.env.PUBLIC_URL}/scene.gltf`

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  )

  const ref = React.useRef<HTMLDivElement>(null)
  const [map, setMap] = React.useState<google.maps.Map>()

  const navigate = useNavigate()

  const addStops = (scene: THREE.Scene) => {
    axios
      .get('https://api.at.govt.nz/v2/gtfs/stops', {
        headers: { 'Ocp-Apim-Subscription-Key': '80929cdb658b4504ad15d28cd150c541' },
      })
      .then((res) => {
        const stops = res.data.response
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        stops.forEach((stop: any) => {
          const lat = stop.stop_lat
          const lon = stop.stop_lon
          // eslint-disable-next-line @typescript-eslint/naming-convention, prefer-destructuring
          const parent_station = stop.parent_station

          if (parent_station !== null) {
            return
          }

          const { center } = props
          const polar = new google.maps.LatLng(lat, lon)
          const relativeMeters = latLngToVector3Relative(polar, center)

          const stopObject = new THREE.Mesh(
            new THREE.SphereGeometry(5),
            new THREE.MeshDepthMaterial(),
          )

          // const distance = scene.add(textObj)
          stopObject.position.copy(relativeMeters)
          scene.add(stopObject)
          const animateBox = () => {
            stopObject.rotateY(0.005)

            requestAnimationFrame(animateBox)
          }
          requestAnimationFrame(animateBox)
          // loader.load(url, (gltf) => {
          //   gltf.scene.scale.set(0.5, 0.5, 0.5)
          //   const bus = gltf.scene
          //   bus.position.copy(relativeMeters)

          //   scene.add(bus)

          //   const animate = () => {
          //     // test.rotateY(0.00174533)
          //     // bus.translateX(0.01)

          //     requestAnimationFrame(animate)
          //   }
          //   requestAnimationFrame(animate)
          // })
        })
      })
  }

  const addVehicles = (scene: THREE.Scene, camera: THREE.Camera, loader: GLTFLoader) => {
    const vehicles = [
      [-36.84142666666666, 174.75067666666666],
      [-36.88971, 174.98968],
      [-36.841748333333335, 174.77657],
      [-36.836755, 174.776135],
      [-36.842275, 174.76574166666666],
      [-36.841143333333335, 174.77600333333334],
      [-36.789048333333334, 174.80939333333333],
    ]
    // 'Ocp-Apim-Subscription-Key': '80929cdb658b4504ad15d28cd150c541',

    axios
      .get('https://api.at.govt.nz/v2/public/realtime/vehiclelocations', {
        headers: { 'Ocp-Apim-Subscription-Key': '80929cdb658b4504ad15d28cd150c541' },
      })
      .then((res) => {
        let entities = res.data.response.entity
        let count1 = 0
        let count2 = 0
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        entities = entities.filter((entity: any) => {
          const { id, vehicle } = entity

          if (String(id).length !== 5) {
            count1 += 1
            return false
          }

          if (
            vehicle.vehicle.license_plate === '' ||
            vehicle.vehicle.license_plate === undefined ||
            String(vehicle.vehicle.license_plate).length > 6
          ) {
            count2 += 1
            return false
          }

          if (vehicle.trip === undefined) {
            return false
          }
          return true
        })

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        entities.forEach((entity: any) => {
          const lat = entity.vehicle.position.latitude
          const lng = entity.vehicle.position.longitude
          const { center } = props
          const polar = new google.maps.LatLng(lat, lng)
          const relativeMeters = latLngToVector3Relative(polar, center)
          const box = new THREE.Mesh(new THREE.BoxGeometry(4, 2, 2), new THREE.MeshNormalMaterial())

          // const distance = scene.add(textObj)
          box.position.copy(relativeMeters)
          box.scale.set(5, 5, 5)
          scene.add(box)
        })
      })
      .catch((err) => {})
  }

  const setWebGL = (targetMap: google.maps.Map) => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera()
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75)

    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25)

    directionalLight.position.set(0, 10, 50)
    scene.add(directionalLight)

    // Load the model.
    const loader = new GLTFLoader()
    // const url = 'https://raw.githubusercontent.com/googlemaps/js-samples/main/assets/pin.gltf'

    addVehicles(scene, camera, loader)
    addStops(scene)
    // eslint-disable-next-line no-new
    new ThreeJSOverlayView({
      map: targetMap,
      scene,
      // eslint-disable-next-line react/destructuring-assignment
      anchor: { ...props.center, altitude: 0 },
      THREE,
    })

    // start animation loop
  }

  React.useEffect(() => {
    const { center, zoom, mapId, tilt, heading } = props
    if (ref.current && !map) {
      const twinMap = new window.google.maps.Map(ref.current, {
        zoom,
        center,
        mapId,
        tilt,
        heading,
        disableDefaultUI: true,
      })
      setWebGL(twinMap)

      const container = document.createElement('div')

      // const controlButton = styleMapControl(button)

      // ReactDOM.render((<div><Button></Button><div/>), 'div')

      const bgcolor = theme.palette.mode === 'light' ? '#fff' : '#424242'
      const ExitButton = (
        //
        <div>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Paper elevation={3} square sx={{ bgcolor }}>
              <Button variant='text' sx={{ color: 'text.secondary' }} onClick={() => navigate('/')}>
                Exit Map
              </Button>
            </Paper>
          </ThemeProvider>
        </div>
      )
      const root = ReactDOM.createRoot(container)
      root.render(ExitButton)

      // Create the DIV to hold the control.
      const centerControlDiv = document.createElement('div')
      // Append the control to the DIV.
      centerControlDiv.appendChild(container)

      twinMap.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv)

      setMap(twinMap)
    }
  }, [ref, map])

  return <div ref={ref} style={{ height: 'calc(100%)', width: '100%' }} />
}

export default Map
