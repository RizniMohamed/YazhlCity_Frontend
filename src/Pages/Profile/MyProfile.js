import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../../Store/dialogSlice';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import WcIcon from '@mui/icons-material/Wc';
import { getUsers } from '../../services/user';
const MyProfile = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [user, setUser] = useState({})


  useEffect(() => {

    (async () => {
      const { data: { users: [user] } } = await getUsers(`where=id-${auth.userID}`)
      console.log(user);
      setUser({
        avatar: user.image,
        name: user.name,
        address: user.address,
        mobile: user.mobile,
        email: user.Auth.email,
        gender: user.gender,
        nic: user.nic
      })
    })()
  }, [auth.userID])


  const onDelete = () => {
    alert("IM DELETED")
  }

  return (
    <>
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