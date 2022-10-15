import React from 'react'
import * as THREE from 'three'
import { ThreeJSOverlayView } from '@googlemaps/three'
import { useNavigate } from 'react-router-dom'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

interface MapProps extends google.maps.MapOptions {
  center: google.maps.LatLngLiteral
  zoom: number
  mapId: string
  tilt: number
  heading: number
}

const Map: React.FC<MapProps> = (props: MapProps) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [map, setMap] = React.useState<google.maps.Map>()

  const navigate = useNavigate()

  const setWebGL = (targetMap: google.maps.Map) => {
    const scene = new THREE.Scene()

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75)

    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25)

    directionalLight.position.set(0, 10, 50)
    scene.add(directionalLight)

    // Load the model.
    const loader = new GLTFLoader()
    const url = 'https://raw.githubusercontent.com/googlemaps/js-samples/main/assets/pin.gltf'
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 20; i++) {
      loader.load(url, (gltf) => {
        gltf.scene.scale.set(10, 10, 10)
        // eslint-disable-next-line no-param-reassign
        gltf.scene.rotation.x = Math.PI / 2
        // eslint-disable-next-line no-param-reassign
        gltf.scene.position.x += 50 * i
        scene.add(gltf.scene)
      })
    }

    // loader.load(url, (gltf) => {
    //   gltf.scene.scale.set(1, 1, 1)
    //   // eslint-disable-next-line no-param-reassign
    //   gltf.scene.rotation.x = Math.PI / 2
    //   scene.add(gltf.scene)

    //   let { tilt, heading, zoom } = props
    //   const animate = () => {
    //     console.log('GOT HRERERERERRR')

    //     if (tilt < 67.5) {
    //       tilt += 0.5
    //     } else if (heading <= 360) {
    //       heading += 0.2
    //       zoom -= 0.0005
    //     } else {
    //       // exit animation loop
    //       return
    //     }

    //     if (!map) {
    //       return
    //     }
    //     map.moveCamera({ tilt, heading, zoom })

    //     useAnimationFrame(animate)
    //   }

    //   useAnimationFrame(animate)
    // })

    // eslint-disable-next-line no-new
    new ThreeJSOverlayView({
      map: targetMap,
      scene,
      // eslint-disable-next-line react/destructuring-assignment
      anchor: { ...props.center, altitude: 100 },
      THREE,
    })
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

      const controlButton = document.createElement('button')

      // Set CSS for the control.
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

      controlButton.textContent = 'Exit Map'
      controlButton.title = 'Click to recenter the map'
      controlButton.type = 'button'

      // Setup the click event listeners: simply set the map to Chicago.
      controlButton.addEventListener('click', () => {
        navigate('/')
      })

      // Create the DIV to hold the control.
      const centerControlDiv = document.createElement('div')
      // Append the control to the DIV.
      centerControlDiv.appendChild(controlButton)

      twinMap.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv)

      setMap(twinMap)
    }
  }, [ref, map])

  return <div ref={ref} style={{ height: 'calc(100%)', width: '100%' }} />
}

export default Map
