import { Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../Store/dialogSlice';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { messageActions } from '../Store/messageSlice';
import { EmailJS_Config } from '../LocalData/EmailJS';
import { sendMail } from '../services/mail';
import { useState } from 'react';
import { verifyEmail } from '../services/user';

const initVals = {
  email: "",
  OTP: "",
}

const Schema = yup.object().shape({
  email: yup.string().required("Required*").email("Email must be in valid format"),
  OTP: yup.number(),
})

const OTP = () => {

  const { status } = useSelector(state => state.dialog.OTP)
  const dispatch = useDispatch()
  const [OTP, setOTP] = useState(undefined)

  const onSubmit = async (data) => {

    //check user
    const users = await verifyEmail({ email: data.email })
    if (users.status !== 200) {
      dispatch(messageActions.show(['Invalid email', 'error']))
      return
    }

    //prepare email data
    const email_data = {
      service_id: EmailJS_Config.SERVICE_ID,
      template_id: EmailJS_Config.TEMPLATE_ID,
      user_id: EmailJS_Config.PUBLICK_KEY,
      template_params: {
        to: data.email,
        name: "User",
        subject: `Login OTP Verification`,
        OTP: Math.floor(Math.random() * 100000)
      }
    };

    if (OTP) {
      //verfy OTP
      if (data.OTP) {
        if (data.OTP !== OTP)
          dispatch(messageActions.show(['Invalid OTP', 'error']))
        else {
          // eslint-disable-next-line
          dispatch(dialogActions.show(['UpdatePassword', , users.data]))
          dispatch(dialogActions.hide('OTP'))
        }
      } else {
        dispatch(messageActions.show(['OTP required', 'error']))
      }
    } else {
      //send OTP to email
      try {
        const res = await sendMail(email_data)
        if (res === "OK") {
          setOTP(email_data.template_params.OTP)
          dispatch(messageActions.show(['Email has been sent successfully']))
        }
        else
          dispatch(messageActions.show([res, "error"]))
      } catch (error) {
        dispatch(messageActions.show([error, "error"]))
      }
    }

  }

  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: Schema,
  })

  return (
    <Dialog open={status} onClose={() => { dispatch(dialogActions.hide("OTP")) }}  >

      <form onSubmit={formik.handleSubmit}>

        <DialogTitle fontWeight={700} fontSize={34} textAlign="center">OTP Verfication</DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", mx: 5, my: 0, py: 0, width: 300 }}>

          <Box width={"100%"} display="flex" alignItems="center" mb={2}>
            <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, mr: 1.5 }} >Email</Typography>
            <TextField
              variant="outlined"
              size='small'
              type="text"
              placeholder='example@example.com'
              name='email'
              sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 10 } }}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onBlur={formik.handleBlur}
            />
          </Box>
          <Box width={"100%"} display="flex" alignItems="center" >
            <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, mr: 2.5 }} >OTP</Typography>
            <TextField
              variant="outlined"
              size='small'
              type="number"
              disabled={OTP ? false : true}
              placeholder='OTP Code'
              name='OTP'
              sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 10 } }}
              onChange={formik.handleChange}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
              onBlur={formik.handleBlur}
            />
          </Box>

        </DialogContent>

        <Box display="flex" justifyContent="end">
          <Button
            variant='contained'
            size="small"
            type="submit"
            sx={{ mr: 3, mt: 3, mb: 1, minWidth: 100, bgcolor: "secondary.main", color: "white", ":hover": { bgcolor: "secondary.light", } }}>
            Verify
          </Button>
        </Box>

      </form>

    </Dialog >
  )
}


export default OTP