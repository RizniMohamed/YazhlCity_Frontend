import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';


const RoomCard = ({ id, image, roomNo, availablity, price, type, persons }) => {
  return (
    <Card raised sx={{ width: 210, height: 270, mt: 2, mr: 3 }}>
      <Link to={`${id}`}>
        <CardMedia
          component="img"
          alt={roomNo}
          height="140"
          image={image}
        />

        <Box className="availability" bgcolor={availablity === "Available" ? "green" : "Red"}>
          <Typography variant='p' >
            {availablity}
          </Typography>
        </Box>

        <CardContent sx={{ pt: 1 }}>

          <Typography sx={{ fontSize: 17, fontWeight: 700, mb: 1 }}>
            Room {roomNo}
          </Typography>

          <Typography variant="body2" color="text.main">
            <tr>
              <td>Price</td>
              <td width='20px' align="center">:</td>
              <td>{price} LKR</td>
            </tr>
            <tr>
              <td>Type</td>
              <td width='20px' align="center">:</td>
              <td>{type}</td>
            </tr>
            <tr>
              <td>Persons</td>
              <td width='20px' align="center">:</td>
              <td>{persons}</td>
            </tr>
          </Typography>
        </CardContent>
      </Link>
    </Card >
  );
}


export default RoomCard