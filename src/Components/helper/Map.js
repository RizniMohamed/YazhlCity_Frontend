import React, { useRef, useState } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { useDispatch } from 'react-redux'
import { mapActions } from '../../Store/mapSlice'
const Map = ({ drag = false }) => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyCbmSTEGlD-KFPipBrAys-xEmGRsmHvlZ8" })
  const mapRef = useRef()
  let position = ({ lat: 9.661508120592226, lng: 80.02554547964867 })

  const dispatch = useDispatch()

  const onPositionChanged = () => {
    if (mapRef.current?.marker && !mapRef.current?.marker.dragging) {
      const newPos = mapRef.current.marker.position
      position = { lat: newPos.lat(), lng: newPos.lng() }
      dispatch(mapActions.set(position))
    }
  }

  console.log(position);
  if (!isLoaded) return <h2>Loading...</h2>
  return (
    <GoogleMap
      zoom={15}
      center={position}
      mapContainerStyle={{
        width: 400,
        height: 300,
        borderRadius: 8,
        marginTop: 24,
        borderColor: "border",
        borderStyle: "solid",
        borderWidth: 1,
        boxShadow: 800,
      }}>
      <Marker
        position={position}
        draggable={drag}
        ref={mapRef}
        onPositionChanged={onPositionChanged} />
    </GoogleMap>
  )
}

export default Map