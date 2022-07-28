import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { getFacilities } from '../services/Room';
import Chips from './Chips';
import BRImage from './helper/BRImage';
import BRTable from './helper/BRTable';

const RoomDetails = ({ data, desc, minWidth = 500 }) => {


  console.log(data);
  const [f, setF] = useState([])

  const loadData = async () => {
    const { data: dataF } = await getFacilities()
    const asd = dataF.map(x => {
      data.facilities.forEach(s => {
        console.log(x.id, s.id);
        if (x.id === s.id)
          x.status = true
      })
      return x
    })
    setF(asd)
  }


  useEffect(() => {
    loadData()
  }, [])



  return (
    <Box display="flex" justifyContent="space-evenly">

      {/* Details */}
      <Box minWidth={minWidth}>
        <Box display="flex" mb={2} alignItems="center" justifyCenter="center">
          <Typography variant="title" >
            Room {data.roomNo}
          </Typography>
          <Typography fontWeight={700} fontSize={18} color={data.availability === "Available" ? "green" : "red"} ml={1} mt={0.5}>
            {data.availability}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="start" mb={2}>
          <Chips data={f} disabled={true}/>
        </Box>
        <BRTable rows={data.rows} firstColWidth={150} rowHeight={62} desc={desc} />
      </Box>

      {/* Image and map */}
      <Box>
        <BRImage images={data.images} />
      </Box>

    </Box >
  )
}

export default RoomDetails