import React from 'react'
import { Avatar, Box, Button, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { useDispatch } from 'react-redux';
import { dialogActions } from '../../Store/dialogSlice';


const MyProfile = () => {
  const dispatch = useDispatch()

  const onDelete = () => {
    alert("IM DELETED")
  }

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" width={"100%"} my={5}>

        <Avatar
          sx={{ width: 200, height: 200 }}
          alt="Profile picture"
          src="https://w0.peakpx.com/wallpaper/173/708/HD-wallpaper-lisa-alexanina-model-lisa-alexanina-girls-model-hairs-curly-hairs-thumbnail.jpg" />
        <Typography fontSize={16} fontWeight={700} sx={{ my: 2 }}>User Name</Typography>

        <Box my={2}>
          <Box display="flex" alignItems="center" mt={1} >
            <LocationOnIcon />
            <Typography fontSize={16} sx={{ ml: 1 }}>No 59, 6th lane, spill road, puttalam</Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={1} >
            <LocalPhoneIcon />
            <Typography fontSize={16} sx={{ ml: 1 }}>Rizni Mohamed</Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={1} >
            <EmailIcon />
            <Typography fontSize={16} sx={{ ml: 1 }}>mnriznimohamed@gmail.com</Typography>
          </Box>
        </Box>

        <Box my={5}>
          <Button
            variant='contained'
            size='small'
            onClick={() => dispatch(dialogActions.show(["delete", onDelete, "Are you sure do you want to delete your profile?"]))}
            sx={{ ...buttonStyle, "&:hover": { bgcolor: "red" } }}>
            Delete
          </Button>
          <Button
            variant='contained'
            size='small'
            onClick={() => dispatch(dialogActions.show(['profile']))}
            sx={{ ...buttonStyle, "&:hover": { bgcolor: "primary.main" } }}>
            Update
          </Button>
        </Box>

      </Box>

    </>
  )
}

export default MyProfile

const buttonStyle = {
  width: 150,
  borderRadius: 0.2,
  bgcolor: "background.mainbg",
  color: "white",
  mx: 1
}