import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../../Store/dialogSlice';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import WcIcon from '@mui/icons-material/Wc';
import { deleteAccount, getUsers } from '../../services/user';
import { messageActions } from '../../Store/messageSlice';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../Store/authSlice';

const MyProfile = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const { data: { users: [user] } } = await getUsers(`where=id-${auth.userID}`)
      setUser({
        avatar: user.image,
        name: user.name ?? "Not given",
        address: user.address ?? "Not given",
        mobile: user.mobile ?? "Not given",
        email: user.Auth.email,
        gender: user.gender ?? "Not given",
        nic: user.nic ?? "Not given"
      })
    })()
  })


  const onDelete = async () => {
    const response = await deleteAccount({ userID: auth.userID })
    if (response.status !== 200)
      dispatch(messageActions.show([response.data, "error"]))
    else {
      dispatch(messageActions.show(["acount deleted successfully"]))
      dispatch(dialogActions.hide('delete'))
      navigate("/", { replace: true });
      dispatch(authActions.reset())
    }
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