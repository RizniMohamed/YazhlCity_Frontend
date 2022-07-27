import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import BoardingDetailsComp from '../Components/BoardingDetails'
import BreadCrumbs from '../Components/BreadCrumbs'
import CallIcon from '@mui/icons-material/Call';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { dialogActions } from '../Store/dialogSlice';
import { getBoardings } from '../services/Boardings';
import { getRooms } from '../services/Room';
import { messageActions } from '../Store/messageSlice';

const BoardingDetails = () => {
  const dispatch = useDispatch()
  const { boardingID } = useParams()
  const [boarding, SetBoarding] = useState(undefined)
  useEffect(() => {
    (async () => {
      const boardings = await getBoardings(`where=id-${boardingID}`)
      if (boardings.status !== 200) {
        dispatch(messageActions.show([boardings.data, "error"]))
        return
      }
      let roomCount = 0;
      await getRooms(`where=boardingID-${boardingID}`)
        .then(res => { roomCount = res.data.count })
        .catch(e => console.log(e))
      const boarding = boardings.data.boardings[0]
      const details = {
        name: boarding.name,
        rating: boarding.rating,
        verified: boarding.verified,
        mobile: boarding.mobile,
        geoloc: boarding.geoloc,
        rows: [
          {
            name: 'Ownername',
            details: boarding.User.name
          },
          {
            name: 'Address',
            details: boarding.address
          },
          {
            name: 'Washrooms',
            details: boarding.Washroom.count
          },
          {
            name: 'Bathrooms',
            details: boarding.Bathroom.count
          },
          {
            name: 'Rooms',
            details: roomCount ?? "Not published yet"
          },
          {
            name: 'Description',
            details: `${boarding.description}. ${boarding.Bathroom.description}. ${boarding.Washroom.description}`
          },
        ],
        images: [...boarding.Boarding_images, { image: boarding.Bathroom.image }, { image: boarding.Washroom.image }]
      }
      SetBoarding(details)
    })()
  }, [boardingID, dispatch])

  if (!boarding)
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height={"90vh"} width="100%">
        <Typography variant="h5" fontWeight={900}>Loading...</Typography>
      </Box>
    )

  return (
    <Box display="flex" flexDirection="column" m="auto" p={2}>
      <Box ml={18} my={2}>
        <BreadCrumbs />
      </Box>
      {boarding && <BoardingDetailsComp data={boarding} />}
      <Box display="flex" ml={isNaN(boarding.rows[4].details) ? 95 : 65} my={5}>
        <Button
          variant='contained'
          size="small"
          onClick={() => {
            // eslint-disable-next-line 
            dispatch(dialogActions.show(['contactView', , `Contact number : ${boarding.mobile}`]))
          }}
          sx={{ width: 150, ...buttonStyle, mr: 2 }} >
          Contact <CallIcon fontSize='small' sx={{ ml: 1 }} />
        </Button>
        <Link to="Rooms">
          {!isNaN(boarding.rows[4].details) && <Button variant='contained' size="small" sx={{ width: 250, ...buttonStyle }} >Explore rooms</Button>}
        </Link>
      </Box>
    </Box>
  )
}

export default BoardingDetails

const buttonStyle = {
  bgcolor: "background.mainbg",
  color: "white",
  "&:hover": {
    bgcolor: "primary.main",
  }
}