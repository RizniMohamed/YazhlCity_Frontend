import { Button, Dialog, DialogTitle } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../Store/dialogSlice';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Boarding from '../Components/boardingForm/Boarding';
import WashBath from '../Components/boardingForm/WashBath';
import { createBoarding, getBoardings, updateBoarding } from '../services/Boardings';
import { messageActions } from '../Store/messageSlice';
import { updateAuth } from '../Hooks/useUpdateAuth';
import { mapActions } from '../Store/mapSlice';
import { useState } from 'react';
import { getUsers } from '../services/user';

let initVals = {
  id: 0,
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
  const auth = useSelector(state => state.auth)
  const { status, data: dialogData } = useSelector(state => state.dialog.boardingForm)
  const dispatch = useDispatch()
  const [defaultValues, setDefaultValues] = useState()


  const onSubmit = async (data) => {
    console.log(data);
    data.boardingImages = [data.boardingImage1, data.boardingImage2, data.boardingImage3]
    try {

      const formData = new FormData()
      formData.append("boardingID", data.id)
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


      if (dialogData.variant === "create") {
        const data = await createBoarding(formData)
        if (data.status !== 200) {
          dispatch(messageActions.show([data.data, "error"]))
          return
        }
      }

      if (dialogData.variant === "update") {
        const data = await updateBoarding(formData)
        if (data.status !== 200) {
          dispatch(messageActions.show([data.data, "error"]))
          return
        }
      }


      await updateAuth()
      dispatch(messageActions.show([`Boarding ${dialogData.variant}d successfully`]))
      dispatch(dialogActions.hide('boardingForm'))
    } catch (error) {
      dispatch(messageActions.show([error.message, "error"]))
    }
  }

  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: Schema,
  })

  const loadData = async () => {
    dispatch(mapActions.reset())
    if (dialogData.variant === "update") {

      const boardings = await getBoardings(`where=id-${dialogData.boardingID}`)
      if (boardings.status !== 200) {
        dispatch(messageActions.show([boardings.data, "error"]))
        return
      }
      const boarding = boardings.data.boardings[0]
      console.log(boarding);

      const position = { lat: boarding.geoloc[1], lng: boarding.geoloc[0] }
      const temp = {
        boardingName: boarding.name,
        boardingMobile: boarding.mobile,
        boardingAddress: boarding.address,
        boardingDesc: boarding.description,
        gender: boarding.gender,
        location: boarding.Location,
        boardingImage1: boarding.Boarding_images[0].image,
        boardingImage2: boarding.Boarding_images[1].image,
        boardingImage3: boarding.Boarding_images[2].image,
        geoLocation: position,
        bathroomCount: boarding.Bathroom.count,
        bathroomImage: boarding.Bathroom.image,
        bathroomDesc: boarding.Bathroom.description,
        washroomCount: boarding.Washroom.count,
        washroomImage: boarding.Washroom.image,
        washroomDesc: boarding.Washroom.description,
      }
      dispatch(mapActions.set(position))

      const users = await getUsers(`where=id-${auth.userID}`)
      if (users.status !== 200) {
        dispatch(messageActions.show([users.data, "error"]))
        return
      }
      const user = users.data.users[0]

      formik.values.boardingName = temp.boardingName
      formik.values.ownerName = temp.ownerName
      formik.values.boardingAddress = temp.boardingAddress
      formik.values.boardingDesc = temp.boardingDesc
      formik.values.boardingImage1 = temp.boardingImage1
      formik.values.boardingImage2 = temp.boardingImage2
      formik.values.boardingImage3 = temp.boardingImage3
      formik.values.boardingMobile = temp.boardingMobile
      formik.values.gender = temp.gender
      formik.values.location = temp.location
      formik.values.geoLocation = boarding.geoloc
      formik.values.bathroomCount = temp.bathroomCount
      formik.values.bathroomImage = temp.bathroomImage
      formik.values.bathroomDesc = temp.bathroomDesc
      formik.values.washroomCount = temp.washroomCount
      formik.values.washroomImage = temp.washroomCount
      formik.values.washroomDesc = temp.washroomDesc
      formik.values.ownerName = user.name
      formik.values.id = boarding.id
      setDefaultValues(temp)
    }
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line
  }, [dialogData])


  return (
    <Dialog open={status} onClose={() => { dispatch(dialogActions.hide("boardingForm")); formik.resetForm() }} fullWidth={true} maxWidth="lg">

      <form onSubmit={formik.handleSubmit}>

        <DialogTitle fontWeight={700} fontSize={34} textAlign="center" >Boarding Register</DialogTitle>

        <Box display="flex" justifyContent="space-evenly">
          <Box width={548}> <Boarding formik={formik} defaultValues={defaultValues} /></Box>
          <Box>
            <Box width={400}> <WashBath formik={formik} renderData={renderBathroomData} renderImages={renderBathroomImage} defaultValues={defaultValues} name={"Bathroom"} /></Box>
            <Box width={400}> <WashBath formik={formik} renderData={renderWashroomData} renderImages={renderWahroomImage} defaultValues={defaultValues} name={"Washroom"} /></Box>
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