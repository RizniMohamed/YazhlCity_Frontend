import { Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../Store/dialogSlice';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {  updatePassword } from '../services/user';
import { messageActions } from '../Store/messageSlice';

const initVals = {
  password: "",
  confirmPassword: "",
}

const Schema = yup.object().shape({
  password: yup.string().required("Required*").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.#?!@$%^&*-]).{8,}$/,
    "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character:"),
  confirmPassword: yup.string().required("Required*").oneOf([yup.ref('password')], 'Password not match.')
})

const UpdatePassword = () => {
  const { status, data: {user} } = useSelector(state => state.dialog.UpdatePassword)
  const dispatch = useDispatch()

  const onSubmit =  async (data) => {
    const { password } = data
    
    
    const updateData = {
      "userID": user.id,
      "password": password
    }

    const response = await updatePassword(updateData)
    if (response.status !== 200) {
      dispatch(messageActions.show(["Password updated successfully", "success"]))
      dispatch(dialogActions.hide("UpdatePassword"))
      dispatch(dialogActions.show(["login"]))
    }
    else
      dispatch(messageActions.show([response.data, "error"]))
  }

  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: Schema,
  })
  return (
    <Dialog open={status} onClose={() => { dispatch(dialogActions.hide("UpdatePassword")) }} >

      <form onSubmit={formik.handleSubmit}>

        <DialogTitle fontWeight={700} fontSize={34} textAlign="center">Update password</DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", mx: 5, my: 0, py: 0, width: 300 }}>

          <Box mb={1.5} width={"100%"} >
            <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >Password</Typography>
            <TextField
              variant="outlined"
              size='small'
              type="password"
              placeholder='Minimum 8 character'
              name='password'
              sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 10 } }}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              onBlur={formik.handleBlur}
            />
          </Box>

          <Box mb={1.5} width={"100%"} >
            <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >Confirm Password</Typography>
            <TextField
              variant="outlined"
              size='small'
              type="password"
              placeholder='Minimum 8 character'
              name='confirmPassword'
              sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 10 } }}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
            Update
          </Button>
        </Box>

      </form>

    </Dialog >
  )
}


export default UpdatePassword