import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useDispatch } from 'react-redux'
import Payment from '../../Dialogs/Payment/Payment'
import { dialogActions } from '../../Store/Dialogs/dialogSlice'

const Rizni = () => {


  const dispatch = useDispatch()
  return (
    <Box p={3}>
      <Button onClick={() => dispatch(dialogActions.show())}>Click Me</Button>
      <Payment />
    </Box>
  )
}

export default Rizni


