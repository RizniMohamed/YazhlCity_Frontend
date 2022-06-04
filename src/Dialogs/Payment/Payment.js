import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import { Box } from '@mui/system';
import valid from 'card-validator';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import MasterCard from '../../LocalData/MasterCard';
import VisaCard from '../../LocalData/VisaCard';
import { dialogActions } from '../../Store/Dialogs/dialogSlice';
import CardInputs from './CardInputs';
import UserInputs from './UserInputs';

const initVals = {
  fullName: "",
  address: "",
  mobile: "",
  email: "",
  cardholderName: "",
  cardNumber: "",
  expMonth: "",
  expYear: "",
  cvc: "",
}

const currentYear = new Date().getFullYear()

const Schema = yup.object().shape({

  fullName: yup.string().required("Required*"),
  address: yup.string().required("Required*"),
  mobile: yup.number().integer("Illegal inputs.use 0 - 9 digits").positive().min(100000000, "Invalid mobile number").max(999999999, "Invalid mobile number").required("Required*"),
  email: yup.string().email("Email must be in valid format").required("Required*"),

  cardholderName: yup.string().required("Required*"),
  cardNumber: yup.string().required("Required*").test('test-number', 'Credit Card number is invalid', value => valid.number(value).isValid),
  expMonth: yup.number().positive().min(0).max(12).required("Required*"),
  expYear: yup.number().positive().min(currentYear - 2, "Your card is expired").max(currentYear + 2, "Invalid Year").required("Required*"),
  // cvc: yup.number().positive().min(1, "Invalid number").max(999, "Invalid number").required("Required*"),
  cvc: yup.string().required('Required*').matches(/[0-9]+/gi, "Enter number only").length(3, 'Enter correct code')
})



const Payment = () => {
  const {status,onSubmit} = useSelector(state => state.dialog.payment)
  const dispatch = useDispatch()


  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: Schema,
  })



  return (
    <Dialog open={status} onClose={() => { }} maxWidth="lg">

      <form onSubmit={formik.handleSubmit}>

        <Box display="flex" justifyContent="space-between" >
          <Box display="flex" flexDirection="column"  >
            <DialogTitle fontWeight={700} fontSize={22} sx={{ pb: 0 }}>Payment</DialogTitle>
            <Divider variant='middle' sx={{ mb: 2, bgcolor: "background.mainbg" }} />
            <DialogContent sx={{ display: "flex", flexDirection: "column", pt: 1 }}>
              <UserInputs {...formik} />
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
              <CardInputs {...formik} />
            </DialogContent>
          </Box>
        </Box>

        <DialogActions >
          <Button
            variant='contained'
            size="small"
            onClick={() => { formik.resetForm(); dispatch(dialogActions.hide()) }}>
            Cancel
          </Button>
          <Button
            variant='contained'
            type='submit'
            size="small"
            sx={{ ":hover": { bgcolor: "green !important" } }}
          >
            Proceed
          </Button>
        </DialogActions>

      </form>

    </Dialog>

  )
}

export default Payment