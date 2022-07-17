import React from 'react'
import { Box, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import BoardingDetails from '../../Components/BoardingDetails'
import { dialogActions } from "../../Store/dialogSlice"

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

const BoardingManagement = () => {
  const dispatch = useDispatch()

  const onDelete = () => {
    dispatch(dialogActions.hide('delete'))
  }

  return (
    <Box display="flex" flexDirection="column" m="auto" p={2}>
      <BoardingDetails data={boardingData} />
      <Box display="flex" justifyContent="end">
        <Button v
          ariant='contained'
          size="small"
          onClick={() => dispatch(dialogActions.show(['delete', onDelete, "Are you sure do you want to delete this boarding?"]))}
          sx={{ width: 150, ...buttonStyle, mr: 2 }} >
          Delete
        </Button>
        <Button variant='contained' size="small" sx={{ width: 150, ...buttonStyle }} >Update</Button>
      </Box>
    </Box>
  )
}

export default BoardingManagement

const buttonStyle = {
  bgcolor: "background.mainbg",
  color: "white",
  "&:hover": {
    bgcolor: "primary.main",
  }

}