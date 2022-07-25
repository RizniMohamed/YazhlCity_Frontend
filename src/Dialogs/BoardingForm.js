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


let initVals = {
  boardingName: "",
  ownerName: "",
  boardingAddress: "",
  boardingDesc: "",
  boardingImage1: "",
  boardingImage2: "",
  boardingImage3: "",
  geoLocation: "",
  bathroomCount: "",
  bathroomImage: "",
  bathroomDesc: "",
  washroomCount: "",
  washroomImage: "",
  washroomDesc: "",
}

const Schema = yup.object().shape({
  boardingName: yup.string().required("Required*"),
  ownerName: yup.string().required("Required*"),
  boardingAddress: yup.string().required("Required*"),
  boardingDesc: yup.string().required("Required*"),
  boardingImage1: yup.mixed().required("Required*"),
  boardingImage2: yup.mixed().required("Required*"),
  boardingImage3: yup.mixed().required("Required*"),
  geoLocation: yup.mixed().required("Required*"),
  bathroomCount: yup.string().required("Required*"),
  bathroomImage: yup.mixed().required("Required*"),
  bathroomDesc: yup.string().required("Required*"),
  washroomCount: yup.string().required("Required*"),
  washroomImage: yup.mixed().required("Required*"),
  washroomDesc: yup.string().required("Required*"),
})


const BoardingForm = () => {
  const { status } = useSelector(state => state.dialog.boardingForm)
  const dispatch = useDispatch()

  const onSubmit = async (data) => { console.log(data) }

  const renderData = [
    { name: "Boarding Name", value: "boardingName",  },
    { name: "Owner Name", value: "ownerName",  },
    { name: "Boarding Address", value: "boardingAddress",  },
    { name: "Boarding Description ", value: "boardingDesc", options: { multiline:true, rows : 3} },
  ]

  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: Schema,
  })


  return (
    <Dialog open={status} onClose={() => { dispatch(dialogActions.hide("boardingForm")) }} >

      <form onSubmit={formik.handleSubmit}>

        <DialogTitle fontWeight={700} fontSize={34} textAlign="center">Boarding Register</DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", pt: 1, mx: 10, width: 300 }}>
          {renderData.map((data,i) => {
            return (
              <Box key={i} mb={2} width={"100%"} >
                <Typography fontWeight={500} fontSize={14} sx={{ mb: 0.3, ml: 0.5 }} >{data.name}</Typography>
                <TextField
                  variant="outlined"
                  size='small'
                  type="text"
                  placeholder={data.name}
                  name={data.value}
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


        </DialogContent>

        <Box display="flex" justifyContent="end">
          <Button v
            ariant='contained'
            size="small"
            type="submit"
            sx={{ width: 100, ...buttonStyle, mr: 2 }} >
            Register
          </Button>
        </Box>
      </form>

    </Dialog>
  )
}

export default BoardingForm

const buttonStyle = {
  bgcolor: "background.mainbg",
  color: "white",
  "&:hover": {
    bgcolor: "secondary.light",
  }
}