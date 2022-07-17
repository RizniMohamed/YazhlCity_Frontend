import React from 'react'
import { Box, Button } from '@mui/material'
import BoardingDetailsComp from '../Components/BoardingDetails'
import BreadCrumbs from '../Components/BreadCrumbs'
import CallIcon from '@mui/icons-material/Call';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { dialogActions } from '../Store/dialogSlice';


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
      name: 'Address',
      details: 'No.14,Jaffna mainroad,Jaffna'
    },
    {
      name: 'Room types',
      details: 'Single/Share'
    },
    {
      name: 'Washrooms',
      details: '2'
    },
    {
      name: 'Bathrooms',
      details: '3'
    },
    {
      name: 'Rooms',
      details: '5'
    },
    {
      name: 'Description',
      details: 'A great rental listing includes an informative title and stellar description that properly describes your rental property. While it’s easy to assume that tenants care more about the rental price, the photos, and location of an apartment, they also pay attention to the description. The rental listing description should complement the photos and other features of your listing while demonstrating you’re a sophisticated landlord.'
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

const BoardingDetails = () => {
  const dispatch = useDispatch()
  return (
    <Box display="flex" flexDirection="column" m="auto" p={2}>
      <Box ml={18} my={2}>
        <BreadCrumbs />
      </Box>
      <BoardingDetailsComp data={boardingData} />
      <Box display="flex" ml={70} my={5}>
        <Button
          variant='contained'
          size="small"
          onClick={e => dispatch(dialogActions.show(['contactView',,`Contact number : 0775824807`]))}
          sx={{ width: 150, ...buttonStyle, mr: 2 }} >
          Contact <CallIcon fontSize='small' sx={{ ml: 1 }} />
        </Button>
        <Link to="Rooms">
          <Button variant='contained' size="small" sx={{ width: 250, ...buttonStyle }} >Explore rooms</Button>
        </Link>

      </Box>
    </Box>
  )
}

export default BoardingDetails

const buttonStyle = {
  bgcolor: "background.mainbg",
  color: "white",
  "&:hover": {
    bgcolor: "primary.main",
  }
}