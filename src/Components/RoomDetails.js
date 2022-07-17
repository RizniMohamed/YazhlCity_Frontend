import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React from 'react';
import BRImage from './helper/BRImage';
import BRTable from './helper/BRTable';

const RoomDetails = ({ data, desc, minWidth = 500 }) => {
  return (
    <Box display="flex" justifyContent="space-evenly">

      {/* Details */}
      <Box minWidth={minWidth}>
        <Box display="flex" mb={2} alignItems="center" justifyCenter="center">
          <Typography variant="title" >
            Room {data.roomNo}
          </Typography>
          <Typography fontWeight={700} fontSize={18} color={data.availability ==="Available"?"green":"red"} ml={1} mt={0.5}>
            {data.availability}
          </Typography>
        </Box>
        <BRTable rows={data.rows} firstColWidth={150} rowHeight={62} desc={desc}/>
      </Box>

      {/* Image and map */}
      <Box>
        <BRImage images={data.images} />
      </Box>

    </Box >
  )
}

export default RoomDetails