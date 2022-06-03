import React from 'react';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import BRTable from '../Components/helper/BRTable';
import { dialogActions } from '../Store/Dialogs/dialogSlice';

const PaymentDetails = ({data}) => {
  const status = useSelector(state => state.dialog.status)
  const dispatch = useDispatch()

  const data = {
    info: [
      {
        name: "Cutomer Id",
        details: data.customerID,
      },
      {
        name: "Cutomer Name",
        details: data.customerName,
      },
      {
        name: "Boarding Name",
        details: data.boardingName,
      },
      {
        name: "Room id",
        details: data.roomID,
      },
    ],
    billing : [
      {
        name: "Period",
        details: data.period,
      },
      {
        name: "Invoice Type",
        details: data.invoiceType,
      },
      {
        name: "Invoice id",
        details: data.invoiceID,
      },
      {
        name: "Amount",
        details: data.amount,
      },
    ]
  }


  return (
    <Dialog open={status} onClose={() => { }} fullWidth>
      <DialogTitle fontWeight={700} fontSize={22}> Payment Details </DialogTitle>
      <DialogContent>
          <BRTable rows={data.info} firstColWidth={130} desc={false} />
          <Divider sx={{ my: 2, bgcolor: "background.mainbg" }} />
          <Typography component="p" color="text.main" fontWeight={1000} fontSize={18} my={1}>Billing Details</Typography>
          <BRTable rows={data.billing} firstColWidth={130} desc={false} />
      </DialogContent>
      <DialogActions >
        <Button
          variant='contained'
          size="small"
          onClick={() => dispatch(dialogActions.hide())}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PaymentDetails