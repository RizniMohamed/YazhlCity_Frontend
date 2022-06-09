import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import Footer from '../Components/Footer'

const Welcome = () => {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" height="calc(70vh - 64px)">
        <Typography variant="h1" color="background.secondarybg">YAZHL CITY</Typography>
      </Box>
      <Footer />
    </>
  )
}

export default Welcome