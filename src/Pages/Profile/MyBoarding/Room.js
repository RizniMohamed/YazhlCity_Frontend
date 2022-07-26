import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RoomDetailsComp from '../../../Components/RoomDetails'
import { getRooms } from '../../../services/Room'
import { getUsers } from '../../../services/user'
import { messageActions } from '../../../Store/messageSlice'

const Room = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [roomData, SetRoom] = useState(undefined)

  useEffect(() => {
    (async () => {

      const users = await getUsers(`where=id-${auth.userID}`)
      if (users.status !== 200) {
        dispatch(messageActions.show([users.data, "error"]))
        return
      }
      const user = users.data.users[0]

      const rooms = await getRooms(`where=id-${user.roomID}`)
      if (rooms.status !== 200) {
        dispatch(messageActions.show([rooms.data, "error"]))
        return
      }
      const room = rooms.data.rooms[0]

      const details = {
        id: room.id,
        roomNo: room.room_number,
        price: room.price,
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
    })()
  }, [auth?.userID,dispatch])

  return (
    <Box display="flex" flexDirection="column" m="auto" p={2}>
      {roomData && <RoomDetailsComp data={roomData} />}
    </Box>
  )
}

export default Room

