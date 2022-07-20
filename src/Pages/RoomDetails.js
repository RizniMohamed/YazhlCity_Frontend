import { Box, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import BreadCrumbs from '../Components/BreadCrumbs'
import RoomDetailsComp from '../Components/RoomDetails'
import { useDispatch } from 'react-redux'
import {dialogActions} from '../Store/dialogSlice'

const paymentOnclick = () => {
  alert("IM CLICKED")
}

const roomData = {
  roomNo: 10,
  availability: "Unavailable",
  rows: [
    {
      name: 'Room type',
      details: 'Single/Share'
    },
    {
      name: 'Max Persons',
      details: '2'
    },
    {
      name: 'Available Persons',
      details: '3'
    },
    {
      name: 'Description',
      details: 'A great rental listing includes an informative title and stellar description that properly describes your rental property. While it’s easy to assume that tenants care more about the rental price, the photos, and location of an apartment, they also pay attention to the description. The rental listing description should complement the photos and other features of your listing while demonstrating you’re a sophisticated landlord.'
    },
  ],
  images: [
    {
      name: "Random Name #1",
      path: "https://www.japan-guide.com/g21/2030_01.jpg"
    },
   
  ]
}


const RoomDetails = () => {
  const dispatch = useDispatch()
  return (
    <Box display="flex" flexDirection="column" m="auto" p={2}>
      <Box ml={18} my={2}>
        <BreadCrumbs />
      </Box>
      <RoomDetailsComp data={roomData} />
      <Box display="flex" ml={100} my={5}>
        <Button
          variant='contained'
          size="small"
          onClick={() => dispatch(dialogActions.show(['payment',paymentOnclick]))}
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