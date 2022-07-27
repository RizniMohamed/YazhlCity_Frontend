import { Autocomplete, Avatar, Button, IconButton, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { getUsers, updateProfile } from '../../services/user';
import { messageActions } from '../../Store/messageSlice';

const initVals = {
  name: "",
  address: "",
  mobile: "",
  image: "",
  gender: "",
  nic: "",
}

const Schema = yup.object().shape({
  name: yup.string().required("Required*"),
  address: yup.string().required("Required*"),
  mobile: yup.string().required("Required*"),
  gender: yup.string().required("Required*"),
  nic: yup.string().required("Required*"),
  image: yup.mixed().required("Required*"),
})

const ProfileForm = ({ status }) => {
  const [image, setImage] = useState("")
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  const onSubmit = async (dataInput) => {

    try {
      const formData = new FormData()
      formData.append("userID", auth.userID)
      formData.append("name", dataInput.name)
      formData.append("gender", dataInput.gender)
      formData.append("address", dataInput.address)
      formData.append("mobile", dataInput.mobile)
      formData.append("nic", dataInput.nic)
      formData.append("ImageFolder", "user")
      formData.append("image", dataInput.image)

      console.log(formData.get('userID'));
      const data = await updateProfile(formData)
      if (data.status !== 200)
        dispatch(messageActions.show([data.data, "error"]))
      else
        dispatch(messageActions.show(["Profile updated successfully"]))
    } catch (error) {
      dispatch(messageActions.show([error.message, "error"]))
    }

  }

  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: Schema,
  })

  const renderData = [
    { name: "Name", value: "name", options: { defaultValue: formik.values.name } },
    { name: "Address", value: "address", options: { defaultValue: formik.values.address } },
    { name: "Mobile", value: "mobile", options: { placeholder: "Enter without leading zero", type: "number", defaultValue: formik.values.mobile } },
    { name: "NiC", value: "nic", options: { defaultValue: formik.values.nic } },
  ];



  const onImageChange = (e) => {
    formik.values.image = e.target.files[0]
    const image = URL.createObjectURL(e.target.files[0])
    setImage(image)
  }

  useEffect(() => {
    (async () => {
      const { data: { users: [user] } } = await getUsers(`where=id-${auth.userID}`)
        formik.values.address = user?.address
        formik.values.image = user?.image
        formik.values.mobile = user?.mobile
        formik.values.name = user?.name
        formik.values.nic = user?.nic
        formik.values.gender = user?.gender
        setImage(user?.image)
    })()
    // eslint-disable-next-line
  }, [status, auth.userID])

  const genderList = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" }
  ]

  const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1)

  return (
    <>
      <form onSubmit={formik.handleSubmit}>

        <Box display="flex" justifyContent="center">
          <IconButton color="primary" component="label" size="small" sx={{ p: 0 }} >
            <Avatar src={image} sx={{ height: 150, width: 150 }} />
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={onImageChange} />
          </IconButton>
        </Box>

        {renderData.map((data, i) => {
          return (
            <Box key={i} mb={2} width={"100%"} >
              <Typography fontWeight={500} fontSize={14} sx={{ mb: 0.3, ml: 0.5 }} >{data.name}</Typography>
              <TextField
                variant="outlined"
                size='small'
                type="text"
                placeholder={data.name.toString()}
                name={data.value.toString()}
                sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 0.3 } }}
                onChange={formik.handleChange}
                error={formik.touched[data.value] && Boolean(formik.errors[data.value])}
                onBlur={formik.handleBlur}
                {...data?.options}
              />
            </Box>
          )
        })}

        <Box mb={2} width={"100%"} >
          <Typography fontWeight={500} fontSize={14} sx={{ mb: 0.3, ml: 0.5 }} >Gender</Typography>
          <Autocomplete
            size='small'
            options={genderList}
            defaultValue={{ name: formik.values.gender? capitalizeFirstLetter(formik.values.gender):"", value: formik.values.gender }}
            onChange={(e, value) => { formik.values.gender = value.value }}
            getOptionLabel={option => option.name}
            PaperComponent={params => <Paper {...params} sx={paperStyle} />}
            sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 0.3 } }}
            renderInput={(params) => (
              < TextField
                {...params}
                name="gender"
                placeholder="Gender"
                onBlur={formik.handleBlur}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                inputProps={{ ...params.inputProps, readOnly: true }}
                sx={{ minWidth: 200, }}
              />
            )}
          />
        </Box>



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

export default ProfileForm

const paperStyle = {
  bgcolor: "background.mainbg",
  borderRadius: 0.3,
  mt: 0.5,
  "li": {
    color: "white",
    px: 2
  },
}