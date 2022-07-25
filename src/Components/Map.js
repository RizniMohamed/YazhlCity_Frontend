import React, { useRef } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { useDispatch } from 'react-redux'
import { mapActions } from '../Store/mapSlice'
import { GOOGLE_MAP_KEY } from '../LocalData/Keys'
import { Box, Typography } from '@mui/material'

const Map = ({ drag = false, mt = 3, lng = 9.661508120592226, lat = 80.02554547964867 }) => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: GOOGLE_MAP_KEY })
  const mapRef = useRef()
  let position = ({ lat, lng })
  const dispatch = useDispatch()

  const onPositionChanged = () => {
    if (mapRef.current?.marker && !mapRef.current?.marker.dragging) {
      const newPos = mapRef.current.marker.position
      position = { lat: newPos.lat(), lng: newPos.lng() }
      dispatch(mapActions.set(position))
    }
  }

  if (!isLoaded)
    return (
      <Box width={400} height={300} display="flex" justifyContent="center" alignItems="center">
        <Typography fontSize={24} fontWeight={900}>Loading...</Typography>
      </Box>
    )

  return (
    <Box
      marginTop={mt}
      width={400}
      height={300}
      borderRadius={3.5}
      sx={{ borderColor: "#B4B4B4", borderStyle: "solid", borderWidth: 0.5 }}
      boxShadow={10}>
      <GoogleMap
        zoom={15}
        center={position}
        mapContainerStyle={{
          width: 400,
          height: 300,
          borderRadius: 16,
        }}>
        <Marker
          position={position}
          draggable={drag}
          ref={mapRef}
          onDblClick={e => window.open(`https://www.google.com/maps/search/?api=1&query=${e.latLng.lat()},${e.latLng.lng()}`, '_blank', 'location=yes,height=900,width=1600,scrollbars=yes,status=yes')}
          onPositionChanged={onPositionChanged} />
      </GoogleMap>
    </Box>
  )
}

export default Map