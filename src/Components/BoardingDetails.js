import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Rating } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React from 'react';
import BRImage from './helper/BRImage';
import BRTable from './helper/BRTable';
import Map from './Map';

const BoardingDetails = ({ data, desc }) => {
  return (
    <Box display="flex" justifyContent="space-evenly">

      {/* Details */}
      <Box minWidth={500}>
        <Box display="flex" flexDirection="column" mb={2} justifyItems="center">
          <Typography variant="title" >
            {data.name}
            {data.verified && <VerifiedUserIcon sx={{ color: "#699BF7", ml: 1 }} />}
          </Typography>
          <Rating value={data.rating} sx={{ mt: 0.5 }} readOnly />
        </Box>
        <BRTable rows={data.rows} firstColWidth={100} rowHeight={62} desc={desc} />
      </Box>

      {/* Image and map */}
      <Box>
        <BRImage images={data.images} />
        <Map />
      </Box>

    </Box >
  )
}

export default BoardingDetails
