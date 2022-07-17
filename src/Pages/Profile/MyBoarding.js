import { Box, Button, Divider } from '@mui/material'
import React from 'react'
import BoardingDetails from '../../Components/BoardingDetails'
import RoomDetails from '../../Components/RoomDetails'
import {Link} from "react-router-dom"
const boardingData = {
  name: "RC House",
  rating: 4,
  verified: true,
  rows: [
    {
      name: 'Ownername',
      details: 'Sarujan'
    },
    {
      name: 'Contact',
      details: 'Single/Share'
    },
    {
      name: 'Address',
      details: 'No.14,Jaffna mainroad,Jaffna'
    },
  ],
  images: [
    {
      name: "Random Name #1",
      path: "https://cdn.pixabayasd.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
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


const roomData = {
  roomNo: 10,
  availability: "Unavailable",
  rows: [
    {
      name: 'Room types',
      details: 'Single/Share'
    },
    {
      name: 'Payment status',
      details: 'Unpaid'
    },
    {
      name: 'Total duration',
      details: '3 months'
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

const MyBoarding = () => {
  return (
    <>
      <Box width="100%" mt={2}>
        <BoardingDetails data={boardingData} desc={false} />
        <Link to="/Boardings/:boardingID/">
          <Button variant='contained' size="small" sx={{ width: 250, ...buttonStyle, ml: 65 }} >View Boarding</Button>
        </Link>
        <Divider variant='middle' sx={{ display: "block", bgcolor: "secondary.main", my: 5, width: 1000, ml: 28 }} />
        <RoomDetails data={roomData} desc={false} />
        <Link to="/Boardings/:boardingID/Rooms/:roomID">
          <Button variant='contained' size="small" sx={{ width: 250, ...buttonStyle, ml: 65 }} >View Room</Button>
        </Link>
      </Box>
    </>
  )
}

export default MyBoarding


const buttonStyle = {
  bgcolor: "background.mainbg",
  color: "white",
  "&:hover": {
    bgcolor: "primary.main",
  }
}