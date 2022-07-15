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
      path: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
    },
    {
      name: "Random Name #1",
      path: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
    },
    {
      name: "Random Name #1",
      path: "https://static.remove.bg/remove-bg-web/6ad52d54336ad62d58e7bd1317d40fb98e377ad5/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg"
    },
    {
      name: "Random Name #1",
      path: "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
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