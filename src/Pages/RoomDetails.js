import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BreadCrumbs from '../Components/BreadCrumbs'
import RoomDetailsComp from '../Components/RoomDetails'
import { useDispatch, useSelector } from 'react-redux'
import { getRooms } from '../services/Room'
import { messageActions } from '../Store/messageSlice'

import StripeCheckout from 'react-stripe-checkout';
import { STRIPE_KEY } from '../LocalData/Stripe'
import { getAuths, subscribe } from '../services/user'
import { LKR_USD } from '../services/Payment'
import { authActions } from '../Store/authSlice'

const RoomDetails = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const { roomID } = useParams()
  const [roomData, SetRoom] = useState(undefined)

  const tokenHandler = async (token) => {
    const payment_USD = await LKR_USD(roomData.price)
    const subscribed_data = await subscribe({ userID: auth.userID, roomID: roomData.id, stripeToken: token, payment_USD: payment_USD })
    
    if (subscribed_data.status !== 200) {
      dispatch(messageActions.show([subscribed_data.data, 'error']))
      return
    }

    const user = await getAuths(`where=userID-${auth.userID}`)
    if (user.status !== 200) dispatch(messageActions.show(["Unable to update the system", "error"]))
    dispatch(authActions.set(user?.data?.users[0]))
    getRoomData()
    dispatch(messageActions.show(["Room subscription is succeed"]))
  }


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
      images: [{ image: room.image }]
    }
    SetRoom(details)
  }

  useEffect(() => { getRoomData() }, [roomID, dispatch])

  return (
    <Box display="flex" flexDirection="column" m="auto" p={2}>
      <Box ml={18} my={2}>
        <BreadCrumbs />
      </Box>
      {roomData && <RoomDetailsComp data={roomData} />}
      {auth.role === "user" && roomData.availability === "Available" &&
        <Box display="flex" ml={100} my={5}>
          <StripeCheckout
            token={tokenHandler}
            amount={roomData?.price * 100}
            shippingAddress
            currency="LKR"
            stripeKey={STRIPE_KEY}>
            <Button
              variant='contained'
              size="small"
              sx={{ width: 150, ...buttonStyle, mr: 2 }}>
              Subscribe
            </Button>
          </StripeCheckout>
        </Box>
      }
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