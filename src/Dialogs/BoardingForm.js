import { Button, Dialog, DialogTitle } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../Store/dialogSlice';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Boarding from '../Components/boardingForm/Boarding';
import WashBath from '../Components/boardingForm/WashBath';
import { createBoarding } from '../services/Boardings';
import { messageActions } from '../Store/messageSlice';
import {updateAuth} from '../Hooks/useUpdateAuth';

let initVals = {
  boardingImages: [],
  boardingName: "",
  ownerName: "",
  boardingAddress: "",
  boardingDesc: "",
  boardingImage1: "",
  boardingImage2: "",
  boardingImage3: "",
  location: "",
  geoLocation: "",
  bathroomCount: "",
  bathroomImage: "",
  bathroomDesc: "",
  washroomCount: "",
  washroomImage: "",
  washroomDesc: "",
  boardingMobile: "",
  gender: "",
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
  location: yup.mixed().required("Required*"),
  bathroomCount: yup.string().required("Required*"),
  bathroomImage: yup.mixed().required("Required*"),
  bathroomDesc: yup.string().required("Required*"),
  washroomCount: yup.string().required("Required*"),
  washroomImage: yup.mixed().required("Required*"),
  washroomDesc: yup.string().required("Required*"),
  boardingMobile: yup.string().required("Required*"),
  gender: yup.string().required("Required*"),
})

const renderBathroomImage = { name: "bathroomImage", alt: "Bathroom Count" }
const renderBathroomData = [
  { name: "Bathroom Count", value: "bathroomCount", options: { type: 'number' } },
  { name: "Bathroom Description", value: "bathroomDesc", options: { multiline: true, rows: 3 } },
]

const renderWahroomImage = { name: "washroomImage", alt: "Bathroom Description" }
const renderWashroomData = [
  { name: "Washroom Count", value: "washroomCount", options: { type: 'number' } },
  { name: "Washroom Description", value: "washroomDesc", options: { multiline: true, rows: 3 } },
]

const BoardingForm = () => {
  const { status } = useSelector(state => state.dialog.boardingForm)
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()


  const onSubmit = async (data) => {
    data.boardingImages = [data.boardingImage1, data.boardingImage2, data.boardingImage3]

    const formData = new FormData()
    formData.append("name", data.boardingName)
    formData.append("mobile", data.boardingMobile)
    formData.append("address", data.boardingAddress)
    formData.append("description", data.boardingDesc)
    formData.append("gender", data.gender)
    data.geoLocation.forEach(data => formData.append("geoloc", data))
    formData.append("locationID", data.location.id)
    formData.append("userID", auth.userID)
    formData.append("ImageFolder", "boarding")
    formData.append("washroomDesc", data.washroomDesc)
    formData.append("washroomCount", data.washroomCount)
    formData.append("bathroomDesc", data.bathroomDesc)
    formData.append("bathroomCount", data.bathroomCount)
    data.boardingImages.forEach(data => formData.append("boardingImages", data))
    formData.append("washroomImage", data.washroomImage)
    formData.append("bathroomImage", data.bathroomImage)

    try {
      const { data } = await createBoarding(formData)
      if (data.status !== 200)
        dispatch(messageActions.show([data.data, "error"]))
      else {
        await updateAuth()
        dispatch(messageActions.show(["Boarding registered successfully"]))
        dispatch(dialogActions.hide('boardingForm'))
      }
    } catch (error) {
      dispatch(messageActions.show([error.message, "error"]))
    }
  }

  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: Schema,
  })

  return (
    <Dialog open={status} onClose={() => { dispatch(dialogActions.hide("boardingForm")) }} fullWidth={true} maxWidth="lg">

      <form onSubmit={formik.handleSubmit}>

        <DialogTitle fontWeight={700} fontSize={34} textAlign="center">Boarding Register</DialogTitle>

        <Box display="flex" justifyContent="space-evenly">
          <Box width={548}> <Boarding formik={formik} /></Box>
          <Box>
            <Box width={400}> <WashBath formik={formik} renderData={renderBathroomData} renderImages={renderBathroomImage} name={"Bathroom"} /></Box>
            <Box width={400}> <WashBath formik={formik} renderData={renderWashroomData} renderImages={renderWahroomImage} name={"Washroom"} /></Box>
          </Box>
        </Box>

        <Box display="flex" justifyContent="end">
          <Button
            ariant='contained'
            size="small"
            type="submit"
            sx={{ width: 120, ...buttonStyle, mr: 15, my: 2 }} >
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