import { Button, Dialog, DialogTitle } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import FacilityImg from '../Components/roomForm/FacilityImg';
import Room from '../Components/roomForm/Room';
import { createRoom } from '../services/Room';
import { dialogActions } from '../Store/dialogSlice';
import { messageActions } from '../Store/messageSlice';

let initVals = {
  id: 0,
  room_number: 0,
  person_count: 0,
  price: 0,
  image: "",
  description: "",
  type: "",
  facilities: null
}

const Schema = yup.object().shape({
  room_number: yup.number().required("Required*").min(1),
  person_count: yup.number().required("Required*").min(1),
  price: yup.number().required("Required*").min(1),
  image: yup.mixed().required("Required*"),
  description: yup.string().required("Required*"),
  type: yup.mixed().required("Required*"),
  facilities: yup.mixed().required("Required*"),
})


const RoomForm = () => {
  const { status, data: dialogData } = useSelector(state => state.dialog.roomForm)
  const dispatch = useDispatch()
  const [defaultValues, setDefaultValues] = useState(undefined)


  const onSubmit = async (dataInput) => {
    try {

      const facilityIDs = []
      dataInput.facilities.forEach(f => {
        facilityIDs.push(f.id)
      })

      const formData = new FormData()
      formData.append("ImageFolder", "room")
      formData.append("boardingID", dialogData.boardingID)
      formData.append("roomNumber", dataInput.room_number)
      formData.append("personCount", dataInput.person_count)
      formData.append("price", dataInput.price)
      formData.append("image", dataInput.image)
      formData.append("description", dataInput.description)
      formData.append("type", dataInput.type)
      formData.append("facilityID", facilityIDs)

      if (dialogData.variant === "create") {
        console.log("data");
        const data = await createRoom(formData)
        console.log(data);
        if (data.status !== 201) {
          dispatch(messageActions.show([data.data, "error"]))
          return
        }
      }

      if (dialogData.variant === "update") {
        // const data = await updateBoarding(formData)
        // if (data.status !== 200) {
        //   dispatch(messageActions.show([data.data, "error"]))
        //   return
        // }
      }

      dispatch(messageActions.show([`Room ${dialogData.variant}d successfully`]))
      dispatch(dialogActions.hide('roomForm'))
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
    if (dialogData.variant === "update") {

      // const boardings = await getBoardings(`where=id-${dialogData.boardingID}`)
      // if (boardings.status !== 200) {
      //   dispatch(messageActions.show([boardings.data, "error"]))
      //   return
      // }
      // const boarding = boardings.data.boardings[0]

      const temp = {

      }

      // formik.values.boardingName = temp.boardingName

      setDefaultValues(temp)
    }
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line
  }, [dialogData])


  return (
    <Dialog open={status} onClose={() => { dispatch(dialogActions.hide("roomForm")); formik.resetForm() }} fullWidth={true} maxWidth="lg">

      <form onSubmit={formik.handleSubmit}>

        <DialogTitle fontWeight={700} fontSize={34} textAlign="center" >Room Register</DialogTitle>

        <Box display="flex" justifyContent="space-evenly">
          <Box width={548}> <Room formik={formik} defaultValues={defaultValues} /></Box>
          <Box width={400}> <FacilityImg formik={formik} defaultValues={defaultValues} /></Box>
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

export default RoomForm

const buttonStyle = {
  bgcolor: "background.mainbg",
  color: "white",
  "&:hover": {
    bgcolor: "secondary.light",
  }
}