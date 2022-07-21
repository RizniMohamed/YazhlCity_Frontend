import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BreadCrumbs from '../Components/BreadCrumbs'
import RoomDetailsComp from '../Components/RoomDetails'
import { useDispatch } from 'react-redux'
import { dialogActions } from '../Store/dialogSlice'
import { getRooms } from '../services/Room'
import { messageActions } from '../Store/messageSlice'

const paymentOnclick = () => {
  alert("IM CLICKED")
}

const RoomDetails = () => {
  const dispatch = useDispatch()
  const { roomID } = useParams()
  const [roomData, SetRoom] = useState(undefined)
  useEffect(() => {
    (async () => {
      const  rooms = await getRooms(`where=id-${roomID}`)
      if (rooms.status !== 200) {
        dispatch(messageActions.show([rooms.data, "error"]))
        return
      }
      const room = rooms.data.rooms[0]
      const details = {
        roomNo: room.room_number,
        availability: room.availability? "Available" : "Unavailable",
        rows: [
          {
            name: 'Room type',
            details: room.type
          },
          {
            name: 'Max Persons',
            details: room.person_count
          },
          {
            name: 'Available Persons',
            details: room.person_count - room.occupaidCounts
          },
          {
            name: 'Price',
            details: room.price + " LKR"
          },
          {
            name: 'Description',
            details: room.description
          },
        ],
        images: [{image: room.image}]
      }
      SetRoom(details)
    })()
  }, [roomID, dispatch])
  return (
    <Box display="flex" flexDirection="column" m="auto" p={2}>
      <Box ml={18} my={2}>
        <BreadCrumbs />
      </Box>
      {roomData && <RoomDetailsComp data={roomData} />}
      <Box display="flex" ml={100} my={5}>
        <Button
          variant='contained'
          size="small"
          onClick={() => dispatch(dialogActions.show(['payment', paymentOnclick]))}
          sx={{ width: 150, ...buttonStyle, mr: 2 }}>
          Subscribe
        </Button>
      </Box>
    </Box>
  )
}

export default RoomDetails

const buttonStyle = {
  bgcolor: "background.mainbg",
  color: "white",
  "&:hover": {
    bgcolor: "primary.main",
  }
}