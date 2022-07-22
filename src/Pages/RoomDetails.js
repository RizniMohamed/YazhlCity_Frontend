import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BreadCrumbs from '../Components/BreadCrumbs'
import RoomDetailsComp from '../Components/RoomDetails'
import { useDispatch, useSelector } from 'react-redux'
import { dialogActions } from '../Store/dialogSlice'
import { getRooms } from '../services/Room'
import { messageActions } from '../Store/messageSlice'

import StripeCheckout from 'react-stripe-checkout';
import { STRIPE_KEY } from '../LocalData/Stripe'
import { subscribe } from '../services/user'
import { makePayment } from '../services/Payment'


const paymentOnclick = () => {
  alert("IM CLICKED")
}

const RoomDetails = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const { roomID } = useParams()
  const [roomData, SetRoom] = useState(undefined)

  const tokenHandler = async (token) => {
    const subscribed_data = await subscribe({ userID: auth.userID, roomID: roomData.id })
    const subscription = subscribed_data.data.Payments[0]
    const payment = await makePayment({ paymentTypeID: 1, paymentID: subscription.id, stripeToken: token, userID: auth.userID })
    console.log(payment);
  }

  useEffect(() => {
    (async () => {
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
    })()
  }, [roomID, dispatch])

  return (
    <Box display="flex" flexDirection="column" m="auto" p={2}>
      <Box ml={18} my={2}>
        <BreadCrumbs />
      </Box>
      {roomData && <RoomDetailsComp data={roomData} />}
      {auth.role === "user" &&
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