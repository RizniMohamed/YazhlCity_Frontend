import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';

const RoomCard = ({ id, image, roomNo, availablity, price, type, persons }) => {
  const theme = useTheme()
  return (
    <Card raised sx={{ width: 210, height: 270, mt: 2, mr: 3 }}>
      <Link to={`${id}`}>
        <CardMedia
          component="img"
          alt={roomNo}
          height="140"
          image={image}
        />

        <Box className="availability" bgcolor={availablity ? "green" : "Red"}>
          <Typography variant='p' >
            {availablity ? "Available" : "Unavailable"}
          </Typography>
        </Box>

        <CardContent sx={{ pt: 1 }}>
          <Typography sx={{ fontSize: 17, fontWeight: 700, mb: 1 }}>
            Room {roomNo}
          </Typography>
          <Box color={theme.palette.text.primary}>
            <Box display="flex">
              <Typography sx={{ width: 60 }}>Price</Typography>
              <Typography sx={{ width: 30, textAlign: "center" }}>:</Typography>
              <Typography>{price} LKR</Typography>
            </Box>
            <Box display="flex">
              <Typography sx={{ width: 60 }}>Price</Typography>
              <Typography sx={{ width: 30, textAlign: "center" }}>:</Typography>
              <Typography>{type}</Typography>
            </Box>
            <Box display="flex">
              <Typography sx={{ width: 60 }}>Persons</Typography>
              <Typography sx={{ width: 30, textAlign: "center" }}>:</Typography>
              <Typography>{persons}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Link>
    </Card >
  );
}


export default RoomCard