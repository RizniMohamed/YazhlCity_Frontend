import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Rating } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBoarding } from '../services/Boardings';
import { messageActions } from '../Store/messageSlice';
import BRImage from './helper/BRImage';
import BRTable from './helper/BRTable';
import Map from './Map';

const BoardingDetails = ({ data, desc }) => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const onRatingClick = async (e, value) => {
    const sendData = {
      boardingID: data.id,
      rating: Math.floor((value + data.rating) / 2)
    }
    const boarding = await updateBoarding(sendData)
    if (boarding.status !== 200)
      dispatch(messageActions.show([boarding.data, 'error']))
    else
      dispatch(messageActions.show(['Rating updated successfully']))
  }

  return (
    <Box display="flex" justifyContent="space-evenly">

      {/* Details */}
      <Box minWidth={500}>
        <Box display="flex" flexDirection="column" mb={2} justifyItems="center">
          <Typography variant="title" >
            {data.name}
            {data.verified && <VerifiedUserIcon sx={{ color: "#699BF7", ml: 1 }} />}
          </Typography>
          <Rating value={data.rating} sx={{ mt: 0.5 }} readOnly={auth.role === "user"} onChange={onRatingClick} />
        </Box>
        <BRTable rows={data.rows} firstColWidth={100} rowHeight={62} desc={desc} />
      </Box>


      {/* Image and map */}
      <Box>
        <BRImage images={data.images} />
        <Map lat={Number.parseFloat(data.geoloc[1])} lng={Number.parseFloat(data.geoloc[0])} />
      </Box>

    </Box >
  )
}

export default BoardingDetails
