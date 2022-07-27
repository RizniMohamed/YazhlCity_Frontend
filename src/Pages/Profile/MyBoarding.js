import { Box, Button, Divider, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import Boarding from './MyBoarding/Boarding'
import Room from './MyBoarding/Room'
import { useState } from 'react'
import { getUsers, unsubscribe } from '../../services/user'
import { messageActions } from '../../Store/messageSlice'
import { useNavigate } from 'react-router-dom'
import { dialogActions } from '../../Store/dialogSlice'
import { updateAuth } from '../../Hooks/useUpdateAuth'

const MyBoarding = () => {
  const auth = useSelector(state => state.auth)
  const [user, setUser] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onUnsubscribe = async () => {

    const res = await unsubscribe({ userID: auth.userID })
    if (res.status !== 200) {
      dispatch(messageActions.show([res.data, "error"]))
      return
    }

    updateAuth()
    navigate('/', { replace: true })
    dispatch(messageActions.show(["Unsubscribtion succeeded"]))
  }

  const loadData = async () => {
    const users = await getUsers(`where=id-${auth.userID}`)
    if (users.status !== 200) {
      dispatch(messageActions.show([users.data, "error"]))
      return
    }
    const user = users.data.users[0]
    setUser(user)
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line
  }, [])


  if (!user.roomID)
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height={"90vh"} width={"100vw"}>
        <Typography variant="h5" fontWeight={900}>You havent subscribed any boarding yet :(</Typography>
        <Link to="/Boardings">
          <Button variant='contained' sx={{ ...buttonStyle, mt: 2, borderRadius: 0.3, width: 200, }}>Browse boardings</Button>
        </Link>
      </Box>
    )


  return (
    <Box width="100%" mt={2}>
      <Boarding />
      <Divider variant='middle' sx={dividerStyle} />
      <Room />
      <Box display="flex" justifyContent="end" mr={70} my={2}>
        <Button
          variant='contained'
          size="small"
          onClick={ () => dispatch(dialogActions.show(['delete', onUnsubscribe, "Are you sure do you want to unsubscribe this room?"]))}
          sx={{ ...buttonStyle }} >
          Unsubscribe
        </Button>
      </Box>
    </Box>
  )
}

export default MyBoarding

const buttonStyle = {
  bgcolor: "background.mainbg",
  color: "white",
  width: 150,
  "&:hover": {
    bgcolor: "primary.main",
  }
}

const dividerStyle = {
  display: "block",
  bgcolor: "secondary.main",
  my: 5,
  width: 1000,
  ml: 28
}
