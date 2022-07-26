import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BreadCrumbs from '../Components/BreadCrumbs'
import RoomDetailsComp from '../Components/RoomDetails'
import { useDispatch, useSelector } from 'react-redux'
import { getRooms } from '../services/Room'
import { messageActions } from '../Store/messageSlice'
import {  subscribe } from '../services/user'
import { LKR_USD } from '../services/Payment'
import StripePayment from '../Components/StripePayment'
import { updateAuth } from '../Hooks/useUpdateAuth'

const RoomDetails = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const { roomID } = useParams()
  const [roomData, SetRoom] = useState(undefined)

  const paymentOnClick = async (token) => {
    const payment_USD = await LKR_USD(roomData.price)
    const subscribed_data = await subscribe({ userID: auth.userID, roomID: roomData.id, stripeToken: token, payment_USD: payment_USD })

    if (subscribed_data.status !== 200) {
      dispatch(messageActions.show([subscribed_data.data, 'error']))
      return
    }

    updateAuth()
    getRoomData()
    dispatch(messageActions.show(["Room subscription is succeed"]))
  }

  // eslint-disable-next-line
  const getRoomData = async () => {
    const rooms = await getRooms(`where=id-${roomID}`)
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
  }

  useEffect(() => {
    getRoomData()
  }, [roomID, getRoomData])

  return (
    <Box display="flex" flexDirection="column" m="auto" p={2}>
      <Box ml={18} my={2}>
        <BreadCrumbs />
      </Box>
      {roomData && <RoomDetailsComp data={roomData} />}
      {auth.role === "user" && roomData.availability === "Available" &&
        <Box display="flex" ml={100} my={5}>
          <StripePayment onClick={paymentOnClick} amount={roomData?.price} btnName="Subscribe" />
        </Box>
      }
    </Box>
  )
}

export default RoomDetails

