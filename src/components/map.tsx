import React from 'react'
import * as THREE from 'three'
import { ThreeJSOverlayView } from '@googlemaps/three'
import { useNavigate } from 'react-router-dom'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Button, Paper } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Canvas, useFrame } from '@react-three/fiber'
import * as ReactDOM from 'react-dom/client'

interface MapProps extends google.maps.MapOptions {
  center: google.maps.LatLngLiteral
  zoom: number
  mapId: string
  tilt: number
  heading: number
}

const Map: React.FC<MapProps> = (props: MapProps) => {
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
  // const sceneRef = React.useRef<THREE.Group>()

  const [map, setMap] = React.useState<google.maps.Map>()

  const navigate = useNavigate()

  const styleMapControl = (button: HTMLButtonElement) => {
    const controlButton = button
    controlButton.style.backgroundColor = '#fff'
    controlButton.style.border = '2px solid #fff'
    controlButton.style.borderRadius = '3px'
    controlButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)'
    controlButton.style.color = 'rgb(25,25,25)'
    controlButton.style.cursor = 'pointer'
    controlButton.style.fontFamily = 'Roboto,Arial,sans-serif'
    controlButton.style.fontSize = '16px'
    controlButton.style.lineHeight = '38px'
    controlButton.style.margin = '8px 0 22px'
    controlButton.style.padding = '0 5px'
    controlButton.style.textAlign = 'center'
    return controlButton
  }

  // useFrame((state, delta) => {
  //   if (sceneRef.current === undefined) return
  //   sceneRef.current.position.x += 1
  // })

  const setWebGL = (targetMap: google.maps.Map) => {
    const scene = new THREE.Scene()

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75)

    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25)

    directionalLight.position.set(0, 10, 50)
    scene.add(directionalLight)

    // Load the model.
    const loader = new GLTFLoader()
    // const url = 'https://raw.githubusercontent.com/googlemaps/js-samples/main/assets/pin.gltf'
    const url = `${process.env.PUBLIC_URL}/scene.gltf`

    let test: THREE.Group

    // eslint-disable-next-line no-plusplus
    loader.load(url, (gltf) => {
      gltf.scene.scale.set(0.2, 0.2, 0.2)
      // eslint-disable-next-line no-param-reassign
      // gltf.scene.rotation.x = Math.PI / 2
      // eslint-disable-next-line no-param-reassign
      // gltf.scene.position.x += 50 * i
      // eslint-disable-next-line no-param-reassign
      // gltf.scene.position.setY(-100)
      // sceneRef.current = gltf.scene
      test = gltf.scene
      scene.add(test)

      const animate = () => {
        // test.rotateY(0.00174533)
        test.translateX(0.01)

        requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    })

    const box = new THREE.Mesh(new THREE.BoxGeometry(100, 500, 100), new THREE.MeshNormalMaterial())
    // scene.add(box)

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
