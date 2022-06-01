import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Rating } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React from 'react';
import BRImage from './helper/BRImage';
import BRTable from './helper/BRTable';

const BoardingDetails = ({ data }) => {
  return (
    <Box display="flex" justifyContent="space-evenly">

      {/* Details */}
      <Box >
        <Box display="flex" flexDirection="column" mb={2} justifyItems="center">
          <Typography variant="title" >
            Building Name
            <VerifiedUserIcon sx={{ color: "#699BF7", ml: 1 }}  />
          </Typography>
          <Rating value={4} sx={{ mt: 0.5 }} readOnly />
        </Box>
        <BRTable rows={data.rows} />
      </Box>

      {/* Image and map */}
      <Box>
        <BRImage images={data.images} />
      </Box>

    </Box >
  )
}

export default BoardingDetails
