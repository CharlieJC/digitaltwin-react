import React from 'react'

interface MapProps extends google.maps.MapOptions {
  center: google.maps.LatLngLiteral
  zoom: number
}

const Map: React.FC<MapProps> = (props: MapProps) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [map, setMap] = React.useState<google.maps.Map>()

  React.useEffect(() => {
    if (ref.current && !map) {
      const { center, zoom } = props
      setMap(
        new window.google.maps.Map(ref.current, {
          zoom,
          center,
        }),
      )
    }
  }, [ref, map])

  return <div ref={ref} style={{ height: '100vh', width: '100%' }} />
}

export default Map
