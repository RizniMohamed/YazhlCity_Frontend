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
import { dialogActions } from '../Store/dialogSlice';

const PaymentDetails = () => {
  const { status, data } = useSelector(state => state.dialog.paymentDetails)
  const dispatch = useDispatch()

  const rows = {
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
        name: "Room Number",
        details: data.room_number,
      },
    ],
    billing: [
      {
        name: "Period",
        details: data.period,
      },
      {
        name: "Paid date",
        details: data.paidDate,
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
        <BRTable rows={rows.info} firstColWidth={130} desc={false} />
        <Divider sx={{ my: 2, bgcolor: "background.mainbg" }} />
        <Typography component="p" color="text.main" fontWeight={1000} fontSize={18} my={1}>Billing Details</Typography>
        <BRTable rows={rows.billing} firstColWidth={130} desc={false} />
      </DialogContent>
      <DialogActions >
        <Button
          variant='contained'
          size="small"
          onClick={() => dispatch(dialogActions.hide("paymentDetails"))}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PaymentDetails