import { Button, Dialog, DialogTitle } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import FacilityImg from '../Components/roomForm/FacilityImg';
import Room from '../Components/roomForm/Room';
import { createRoom, deleteRoom, getRooms, updateRoom } from '../services/Room';
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
      formData.append("boardingID", dialogData?.boardingID)
      formData.append("roomID", dialogData?.roomID)
      formData.append("roomNumber", dataInput.room_number)
      formData.append("personCount", dataInput.person_count)
      formData.append("price", dataInput.price)
      formData.append("image", dataInput.image)
      formData.append("description", dataInput.description)
      formData.append("type", dataInput.type)
      formData.append("facilityID", facilityIDs)

      formData.forEach(console.log)

      if (dialogData.variant === "create") {
        const data = await createRoom(formData)
        console.log(data);
        if (data.status !== 201) {
          dispatch(messageActions.show([data.data, "error"]))
          return
        }
      }

      if (dialogData.variant === "update") {
        // const x = await deleteRoom({ roomID: dialogData?.roomID })
        // const data = await createRoom(formData)
        // console.log(data);
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

      const rooms = await getRooms(`where=id-${dialogData.roomID}`)
      if (rooms.status !== 200) {
        dispatch(messageActions.show([rooms.data, "error"]))
        return
      }
      const room = rooms.data.rooms[0]

      console.log(room);

      const temp = {
        room_number: room.room_number,
        person_count: room.person_count,
        price: room.price,
        image: room.image,
        description: room.description,
        type: room.type,
      }

      formik.values.description = temp.description
      formik.values.id = room.id
      formik.values.image = temp.image
      formik.values.person_count = temp.person_count
      formik.values.price = temp.price
      formik.values.room_number = temp.room_number
      formik.values.type = temp.type

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