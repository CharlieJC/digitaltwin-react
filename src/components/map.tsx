import React from 'react'
import * as THREE from 'three'
import { ThreeJSOverlayView } from '@googlemaps/three'

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

  // const useAnimationFrame = (callback: (num: number) => void): void => {
  //   // Use useRef for mutable variables that we want to persist
  //   // without triggering a re-render on their change
  //   const requestRef = React.useRef<number | undefined>()
  //   const previousTimeRef = React.useRef<number | undefined>()

  //   const animate = (time: number) => {
  //     if (previousTimeRef.current !== undefined) {
  //       const deltaTime = time - previousTimeRef.current
  //       callback(deltaTime)
  //     }
  //     previousTimeRef.current = time
  //     requestRef.current = requestAnimationFrame(animate)
  //   }

  //   React.useEffect(() => {
  //     requestRef.current = requestAnimationFrame(animate)
  //     return () => cancelAnimationFrame(requestRef.current || 0)
  //   }, []) // Make sure the effect runs only once
  // }
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
      })
      setWebGL(twinMap)
      setMap(twinMap)
    }
  }, [ref, map])

  return <div ref={ref} style={{ height: '100vh', width: '100%' }} />
}

export default Map
