import { Button, Checkbox, Dialog, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../Store/dialogSlice';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { loginUser } from '../services/user';
import { messageActions } from '../Store/messageSlice';
import { authActions } from '../Store/authSlice';

const Schema = yup.object().shape({
  email: yup.string().required("Required*").email("Email must be in valid format"),
  password: yup.string().required("Required*"),
})

let initVals = { email: "", password: "", rememberMe: false }

const Login = () => {
  const { status } = useSelector(state => state.dialog.login)
  const dispatch = useDispatch()

  const onLoginClick = async ({ email, password, rememberMe }) => {
    if (rememberMe) {
      const loginData = { email, password }
      localStorage.setItem("remeberMe", JSON.stringify(loginData))
    }
    const login = await loginUser({ email, password })
    if (login.status !== 200) {
      dispatch(messageActions.show([login.data, "error"]))
      return
    }
    dispatch(authActions.set(login.data))
    dispatch(dialogActions.hide("login"))
  }

  const loginData = localStorage.getItem("remeberMe")
  if (loginData) {
    const { email, password } = JSON.parse(loginData)
    initVals = { email, password, rememberMe: true }
  }

  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onLoginClick,
    validationSchema: Schema,
  })


  return (
    <Dialog open={status} onClose={() => { dispatch(dialogActions.hide("login")); formik.resetForm() }} >

      <form onSubmit={formik.handleSubmit}>

        <DialogTitle fontWeight={700} fontSize={34} textAlign="center">Login</DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", pt: 1, mx: 10, width: 300 }}>
          {/* <Button
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
          </Divider> */}

          <Box mb={1} width={"100%"} >
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


          <Box mt={1} width={"100%"} >
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

          <Box display="flex" justifyContent="end" alignItems="center">
            <Typography color="secondary">Remember Me</Typography>
            <Checkbox
              size='small'
              name="rememberMe"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.rememberMe}
            />
          </Box>

          <Button
            variant='contained'
            type="submit"
            sx={{ width: 180, alignSelf: "center", color: "white", mt: 2 }}
          >
            Login
          </Button>

        </DialogContent>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography color="secondary">Not registered yet ?</Typography>
          <Button
            variant='text'
            size="small"
            onClick={() => { dispatch(dialogActions.hide("login")); dispatch(dialogActions.show(["signup"])) }}>
            Create an Account
          </Button>

        </Box>


        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <Button
            variant='text'
            size="small"
            sx={{ width: "max-content" }}
            onClick={() => {
              dispatch(dialogActions.hide("login"))
              dispatch(dialogActions.show(['OTP']))
            }}>
            Forget password ?
          </Button>
        </Box>

      </form>

    </Dialog>
  )
}

export default Login