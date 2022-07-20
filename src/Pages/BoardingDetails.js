import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import BoardingDetailsComp from '../Components/BoardingDetails'
import BreadCrumbs from '../Components/BreadCrumbs'
import CallIcon from '@mui/icons-material/Call';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { dialogActions } from '../Store/dialogSlice';
import { getBoardings } from '../services/Boardings';
import { getRooms } from '../services/Room';



const BoardingDetails = () => {
  const dispatch = useDispatch()
  const { boardingID } = useParams()
  const [boarding, SetBoarding] = useState(undefined)
  useEffect(() => {
    (async () => {
      const { boardings } = await getBoardings(`where=id-${boardingID}`)
      let roomCount = 0;
      await getRooms(`where=boardingID-${boardingID}`)
        .then(res => { roomCount = res.count })
        .catch(e => console.log(e))

      const boarding = boardings[0]
      const details = {
        name: boarding.name,
        rating: boarding.rating,
        verified: boarding.verified,
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
            name: 'Room type',
            details: boarding.roomType
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
            details: roomCount
          },
          {
            name: 'Description',
            details: boarding.description
          },
        ],
        images: boarding.Boarding_images
      }
      SetBoarding(details)
    })()
  }, [boardingID])

  const handleContactClick = () => {
    // eslint-disable-next-line 
    dispatch(dialogActions.show(['contactView', , `Contact number : 0775824807`]))
  }

  return (
    <Box display="flex" flexDirection="column" m="auto" p={2}>
      <Box ml={18} my={2}>
        <BreadCrumbs />
      </Box>
      {boarding && <BoardingDetailsComp data={boarding} />}
      <Box display="flex" ml={70} my={5}>
        <Button
          variant='contained'
          size="small"
          onClick={e => handleContactClick}
          sx={{ width: 150, ...buttonStyle, mr: 2 }} >
          Contact <CallIcon fontSize='small' sx={{ ml: 1 }} />
        </Button>
        <Link to="Rooms">
          <Button variant='contained' size="small" sx={{ width: 250, ...buttonStyle }} >Explore rooms</Button>
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