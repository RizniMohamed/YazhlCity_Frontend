import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardingDetailsComp from '../../Components/BoardingDetails';
import { updateAuth } from '../../Hooks/useUpdateAuth';
import { deleteBoarding, getBoardings } from '../../services/Boardings';
import { getRooms } from '../../services/Room';
import { dialogActions } from '../../Store/dialogSlice';
import { messageActions } from '../../Store/messageSlice';
import { useNavigate } from 'react-router-dom'

const BoardingManagement = () => {
  const dispatch = useDispatch()
  const [boarding, SetBoarding] = useState(undefined)
  const auth = useSelector(state => state.auth)
  const navigate = useNavigate()

  const loadData = async () => {
    const boardings = await getBoardings(`where=userID-${auth.userID}`)
    if (boardings.status !== 200) {
      dispatch(messageActions.show([boardings.data, "error"]))
      return
    }
    const boarding = boardings.data.boardings[0]

    const rooms = await getRooms(`where=boardingID-${boarding.id}`)

    const details = {
      id : boarding.id,
      name: boarding.name,
      rating: boarding.rating,
      verified: boarding.verified,
      mobile: boarding.mobile,
      geoloc: boarding.geoloc,
      rows: [
        { name: 'Ownername', details: boarding.User.name },
        { name: 'Address', details: boarding.address },
        { name: 'Washrooms', details: boarding.Washroom.count },
        { name: 'Bathrooms', details: boarding.Bathroom.count },
        { name: 'Rooms', details: rooms.count ?? "Not published yet" },
        { name: 'Description', details: `${boarding.description}. ${boarding.Bathroom.description}. ${boarding.Washroom.description}` },
      ],
      images: [...boarding.Boarding_images, { image: boarding.Bathroom.image }, { image: boarding.Washroom.image }]
    }
    SetBoarding(details)
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line
  }, [])

  const onDelete = async () => {

    const res = await deleteBoarding({ boardingID: boarding.id })
    if (res.status !== 200) {
      dispatch(messageActions.show([res.data, "error"]))
      return
    }

    updateAuth()
    navigate('/', { replace: true })
    dispatch(messageActions.show(["Boarding deleted successfully"]))

  }

  if (!boarding)
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height={"90vh"} width="100%">
        <Typography variant="h5" fontWeight={900}>Loading...</Typography>
      </Box>
    )

  return (
    <Box display="flex" flexDirection="column" m="auto" p={2}>
      <BoardingDetailsComp data={boarding} />
      <Box display="flex" justifyContent="end" mr={60} my={2}>
        <Button
          ariant='contained'
          size="small"
          onClick={() => dispatch(dialogActions.show(['delete', onDelete, "Are you sure do you want to delete this boarding?"]))}
          sx={{ ...buttonStyle, "&:hover": { bgcolor: "red", }, mr: 2 }}>
          Delete
        </Button>
        <Button
          variant='contained'
          size="small"
          onClick={() => 
            // eslint-disable-next-line
            dispatch(dialogActions.show(['boardingForm', , {variant : "update", boardingID: boarding.id}]))
          }
          sx={{ ...buttonStyle }} >
          Update
        </Button>
      </Box>
    </Box >
  )
}

export default BoardingManagement

const buttonStyle = {
  bgcolor: "background.mainbg",
  color: "white",
  borderRadius: 0.3,
  width: 150,
  "&:hover": {
    bgcolor: "primary.main",
  }

}