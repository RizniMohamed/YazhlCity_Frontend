import Breadcrumbs from '../../Components/BreadCrumbs'
import RoomDetails from '../../Components/RoomDetails'
import { Box } from '@mui/system'
import React from 'react'
import { Button } from '@mui/material'
import { dialogActions } from '../../Store/dialogSlice'
import {useDispatch} from "react-redux"


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


const RoomManagement = () => {
  const dispatch = useDispatch()
  
  const onDelete = () => {
    dispatch(dialogActions.hide('delete'))
  }

  return (
    <>
      <Box ml={10} mt={2}>
        <Box my={2}>
          <Breadcrumbs />
        </Box>
        <RoomDetails data={roomData} minWidth={900} />
        <Box display="flex" justifyContent="end" mr={50} mt={5}>
          <Button 
            ariant='contained'
            size="small"
            onClick={() => dispatch(dialogActions.show(['delete', onDelete, "Are you sure do you want to delete this boarding?"]))}
            sx={{ width: 150, ...buttonStyle, mr: 2 }} >
            Delete
          </Button>
          <Button variant='contained' size="small" sx={{ width: 150, ...buttonStyle }} >Update</Button>
        </Box>
      </Box>
    </>
  )
}

export default RoomManagement

const buttonStyle = {
  bgcolor: "background.mainbg",
  color: "white",
  "&:hover": {
    bgcolor: "primary.main",
  }

}