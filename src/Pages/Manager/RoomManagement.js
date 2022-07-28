import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BreadCrumbs from '../../Components/BreadCrumbs'
import RoomDetailsComp from '../../Components/RoomDetails'
import { deleteRoom, getRooms } from '../../services/Room'
import { dialogActions } from '../../Store/dialogSlice'
import { messageActions } from '../../Store/messageSlice'
import { useNavigate } from 'react-router-dom'

const RoomManagement = () => {
  const dispatch = useDispatch()
  const { roomID } = useParams()
  const [roomData, SetRoom] = useState(undefined)
  const navigate = useNavigate()

  // eslint-disable-next-line
  const getRoomData = async () => {
    const rooms = await getRooms(`where=id-${roomID}`)
    if (rooms.status !== 200) {
      dispatch(messageActions.show([rooms.data, "error"]))
      return
    }
    const room = rooms.data.rooms[0]
    console.log(room);
    const details = {
      id: room.id,
      facilities: room.Facilities,
      roomNo: room.room_number,
      price: room.price,
      boardingID: room.boardingID,
      availability: room.availability ? "Available" : "Unavailable",
      rows: [
        { name: 'Room type', details: room.type },
        { name: 'Max Persons', details: room.person_count },
        { name: 'Available Persons', details: room.person_count - room.occupaidCounts },
        { name: 'Price', details: room.price + " LKR" },
        { name: 'Description', details: room.description },
      ],
      images: [{ image: room.image }]
    }
    SetRoom(details)
  }

  useEffect(() => {
    getRoomData()
  }, [roomID])

  const onDelete = async () => {
    console.log(roomData.id);
    const res = await deleteRoom({ roomID: roomData.id })
    if (res.status !== 200) {
      dispatch(messageActions.show([res.data, "error"]))
      return
    }

    navigate(-1)
    dispatch(messageActions.show(["Boarding deleted successfully"]))

  }

  if (!roomData) return (
    <Box display="flex" alignItems="center" justifyContent="center" height={"90vh"} width={"100%"}>
      <Typography variant="h5" fontWeight={900}>Loading...</Typography>
    </Box>
  )

  return (
    <>
      <Box ml={10} mt={2} mx="auto">
        <Box my={2}>
          <BreadCrumbs />
        </Box>
        {roomData && <RoomDetailsComp data={roomData} />}
        <Box display="flex" justifyContent="end" mr={55} my={2}>
          <Button
            ariant='contained'
            size="small"
            onClick={() => dispatch(dialogActions.show(['delete', onDelete, "Are you sure do you want to delete this room?"]))}
            sx={{ ...buttonStyle, "&:hover": { bgcolor: "red", }, mr: 2 }}>
            Delete
          </Button>
          <Button
            variant='contained'
            size="small"
            onClick={() =>
              // eslint-disable-next-line
              dispatch(dialogActions.show(['roomForm', , { variant: "update", roomID: roomData.id, boardingID: roomData.boardingID }]))
            }
            sx={{ ...buttonStyle }} >
            Update
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default RoomManagement

const buttonStyle = {
  bgcolor: "background.mainbg",
  color: "white",
  borderRadius: 0.3,
  width: 150,
  "&:hover": {
    bgcolor: "primary.main",
  }

}