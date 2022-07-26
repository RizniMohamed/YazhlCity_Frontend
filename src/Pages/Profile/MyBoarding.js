import { Box, Button, Divider, Typography } from '@mui/material'
import React from 'react'
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import Boarding from './MyBoarding/Boarding'
import Room from './MyBoarding/Room'

const MyBoarding = () => {
  const auth = useSelector(state => state.auth)

  if (auth.role === "user")
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
      <Divider variant='middle' sx={{ display: "block", bgcolor: "secondary.main", my: 5, width: 1000, ml: 28 }} />
      <Room />
    </Box>
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

