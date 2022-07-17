import { Avatar, Box, Button, Typography, Dialog } from '@mui/material'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../Store/dialogSlice';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import WcIcon from '@mui/icons-material/Wc';

const ProfileDetails = () => {
  const { status, onSubmit, data } = useSelector(state => state.dialog.profileDetails)
  const dispatch = useDispatch()

  const user = {
    avatar: data?.avatar,
    name: data?.name,
    address: data?.address,
    mobile: data?.mobile,
    email: data?.email,
    gender: data?.gender,
    nic: data?.nic

  }

  return (
    <Dialog open={status} onClose={() => { }} fullWidth>
      <Box display="flex" flexDirection="column" alignItems="center" width={"100%"} my={5}>
        <Avatar
          sx={{ width: 200, height: 200 }}
          alt="Profile picture"
          src={user.avatar} />
        <Typography fontSize={16} fontWeight={700} sx={{ my: 2 }}>{user.name}</Typography>
        <Box my={2}>
          <Box display="flex" alignItems="center" mt={1} >
            <LocationOnIcon />
            <Typography fontSize={16} sx={{ ml: 1 }}>{user.address}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={1} >
            <LocalPhoneIcon />
            <Typography fontSize={16} sx={{ ml: 1 }}>{user.mobile}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={1} >
            <EmailIcon />
            <Typography fontSize={16} sx={{ ml: 1 }}>{user.email}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={1} >
            <WcIcon />
            <Typography fontSize={16} sx={{ ml: 1 }}>{user.gender}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={1} >
            <BrandingWatermarkIcon />
            <Typography fontSize={16} sx={{ ml: 1 }}>{user.nic}</Typography>
          </Box>
        </Box>
      </Box>
      <Box my={2} mr={2} display="flex" justifyContent="end">
        <Button
          variant='contained'
          size='small'
          onClick={() => dispatch(dialogActions.hide('profileDetails'))}
          sx={{ ...buttonStyle, "&:hover": { bgcolor: "primary.main" } }}>
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
}

export default ProfileDetails


const buttonStyle = {
  width: 100,
  bgcolor: "background.mainbg",
  color: "white",
  mx: 1
}