import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { updatePassword } from '../../services/user';
import { useDispatch, useSelector } from 'react-redux'
import { messageActions } from '../../Store/messageSlice';

const initVals = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}

const Schema = yup.object().shape({
  currentPassword: yup.string().required("Required*"),
  newPassword: yup.string().required("Required*").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.#?!@$%^&*-]).{8,}$/,
    "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character:"),
  confirmPassword: yup.string().required("Required*").oneOf([yup.ref('newPassword')], 'Password not match.')
})

const renderData = [
  { name: "Current Password", value: "currentPassword" },
  { name: "New Password", value: "newPassword" },
  { name: "Confirm Password", value: "confirmPassword" },
];


const AuthForm = () => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    const sendData = {
      password : data.confirmPassword,
      userID : auth.userID
    }
    const response  = await updatePassword(sendData)
    console.log(response);
    if(response.status !== 200)
      dispatch(messageActions.show([response.data,"error"]))
    else
      dispatch(messageActions.show(["Password updated successfully"]))
  }

  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: Schema,
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {renderData.map((data, i) => {
          return (
            <Box key={i} my={2} width={"100%"} >
              <Typography fontWeight={500} fontSize={14} sx={{ mb: 0.3, ml: 0.5 }} >{data.name}</Typography>
              <TextField
                variant="outlined"
                size='small'
                type="password"
                placeholder={data.name.toString()}
                name={data.value.toString()}
                sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 0.3 } }}
                onChange={formik.handleChange}
                error={formik.touched[data.value] && Boolean(formik.errors[data.value])}
                helperText={formik.touched[data.value] && formik.errors[data.value]}
                onBlur={formik.handleBlur}
                {...data?.options}
              />
            </Box>
          )
        })}

        <Box display="flex" justifyContent="end">
          <Button
            variant='contained'
            type="submit"
            color='secondary'
            sx={{ width: 100, mt: 3, mb: 1 }}
          >
            Update
          </Button>
        </Box>
      </form>
    </>

  )
}

export default AuthForm