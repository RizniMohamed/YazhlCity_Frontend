import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MasterCard from '../LocalData/MasterCard';
import VisaCard from '../LocalData/VisaCard';
import { dialogActions } from '../Store/Dialogs/dialogSlice';
import CardInputs from './Payment/CardInputs';
import UserInputs from './Payment/UserInputs';

const Payment = () => {
  const status = useSelector(state => state.dialog.status)
  const dispatch = useDispatch()

  const [data, setData] = useState({})

  const handleChange = ({ name, value }) => {
    setData({ ...data, [name]: value })
  }

  return (
    <Dialog open={status} onClose={() => { }} maxWidth="lg">

      <Box display="flex" justifyContent="space-between" >
        <Box display="flex" flexDirection="column"  >
          <DialogTitle fontWeight={700} fontSize={22} sx={{ pb: 0 }}>Payment</DialogTitle>
          <Divider variant='middle' sx={{ mb: 2, bgcolor: "background.mainbg" }} />
          <DialogContent sx={{ display: "flex", flexDirection: "column", pt: 1 }}>
            <UserInputs handleChange={handleChange} />
          </DialogContent>
        </Box>

        <Box display="flex" flexDirection="column" >
          <Box display="flex" alignItems="center">
            <DialogTitle fontWeight={700} fontSize={22} sx={{ pb: 0, pr: 1 }}>Card Details</DialogTitle>
            <Box mt={2}>
              <MasterCard /><VisaCard />
            </Box>
          </Box>
          <Divider variant='middle' sx={{ mb: 2, bgcolor: "background.mainbg" }} />
          <DialogContent sx={{ display: "flex", flexDirection: "column", pt: 1 }}>
            <CardInputs handleChange={handleChange} />
          </DialogContent>
        </Box>
      </Box>

      <DialogActions >
        <Button
          variant='contained'
          size="small"
          onClick={() => dispatch(dialogActions.hide())}>
          Cancel
        </Button>
        <Button
          variant='contained'
          size="small"
          sx={{ ":hover": { bgcolor: "green !important" } }}
          onClick={() => dispatch(dialogActions.hide())}>
          Proceed
        </Button>
      </DialogActions>

    </Dialog>

  )
}

export default Payment