import GoogleIcon from '@mui/icons-material/Google';
import { Button, Checkbox, Dialog, DialogContent, DialogTitle, Divider, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../Store/dialogSlice';
import * as yup from 'yup';
import { useFormik } from 'formik';

const initVals = {
  fullName: "",
  email: "",
  password: "",
  rememberMe: false,
  confirmPassword: "",
}

const Schema = yup.object().shape({
  fullName: yup.string().required("Required*"),
  email: yup.string().required("Required*").email("Email must be in valid format"),
  password: yup.string().required("Required*").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.#?!@$%^&*-]).{8,}$/,
    "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character:"),
  confirmPassword: yup.string().required("Required*").oneOf([yup.ref('password')], 'Password not match.')
})

const Signup = () => {
  const { status, onSubmit } = useSelector(state => state.dialog.signup)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: Schema,
  })
  return (
    <Dialog open={status} onClose={() => { dispatch(dialogActions.hide("signup")) }} >

      <form onSubmit={formik.handleSubmit}>

        <DialogTitle fontWeight={700} fontSize={34} textAlign="center">Creat New Account</DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", pt: 1, mx: 10, width: 300 }}>
          <Button
            variant='outlined'
            size='small'
            color='secondary'
            sx={{ bgcolor: "white" }}

          >
            <GoogleIcon fontSize='medium' sx={{ pr: 1 }} />
            Sign in With Google
          </Button>

          <Divider variant='middle'
            sx={{
              my: 2,
              "&::before, &::after": {
                borderColor: "secondary.light",
              },
              fontSize: 10,
              color: "text.secondary"
            }} >
            or Sign in with Email
          </Divider>

          <Box mb={1.5} width={"100%"} >
            <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >Full Name</Typography>
            <TextField
              variant="outlined"
              size='small'
              type="text"
              placeholder='Full Name'
              name='fullName'
              sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 10 } }}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.email}
              onBlur={formik.handleBlur}
            />
          </Box>

          <Box mb={1.5} width={"100%"} >
            <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >Email</Typography>
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

          <Button
            variant='contained'
            type="submit"
            sx={{ width: 180, alignSelf: "center", color: "white", mt: 3,mb:1 }}
          >
            Sign Up
          </Button>

          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography color="secondary">Already have an account?</Typography>
            <Button
              variant='text'
              size="medium"
              onClick={() => { dispatch(dialogActions.hide("signup")); dispatch(dialogActions.show(["login"])) }}
              sx={{ minWidth: "auto" }}
            >
              Login
            </Button>
          </Box>

        </DialogContent>

      </form>

    </Dialog >
  )
}


export default Signup