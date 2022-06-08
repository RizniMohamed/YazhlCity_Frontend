import React from 'react'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'

const notification = ({ subject, from, date, }) => {
  return (
    <Box m={1} width={1}>
      <Typography fontSize={20} fontWeight={500} color="white">{subject}</Typography>
      <Typography fontSize={14} color="white">{from}</Typography>
      <Typography fontSize={12} textAlign="end" color="white">{date}</Typography>
    </Box>
  )
}

export default notification