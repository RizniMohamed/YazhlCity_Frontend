import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useDispatch } from 'react-redux'

import { dialogActions } from '../../Store/Dialogs/dialogSlice'

const Rizni = () => {

  const x = values => { console.log(values); alert("im called") }


  const dispatch = useDispatch()
  const loginModelData = ["signup",,{
    customerID : "Eizni",
    to:"rizni",
    subject : "Tesy",
    createdTime : "2020.12.04 | 01:12 AM",
    message : "THis is a message"
  }]

  return (
    <Box p={3}>
      <Button onClick={() => dispatch(dialogActions.show(loginModelData))}>Click Me</Button>

    </Box>
  )
}

export default Rizni


