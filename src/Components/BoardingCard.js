import { Rating } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';


const BoardingCard = ({ id, image, name, availablity, rating, location, address }) => {
  return (
    <Card raised sx={{ width: 210, height: 270, mt: 2, mr: 3 }}>
      <Link to={`${id}`}>
        <CardMedia
          component="img"
          alt={name}
          height="140"
          image={image}
        />

        <Box className="availability" bgcolor={availablity === "Available" ? "green" : "Red"}>
          <Typography variant='p' >
            {availablity}
          </Typography>
        </Box>

        <CardContent sx={{ pt: 1 }}>
          <Box mb={1} >
            <Typography sx={{ fontSize: 17, fontWeight: 700 }}>
              {name}
            </Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              precision={1}
              size="small"
              readOnly
            />
          </Box>

          <Typography variant="body2" color="text.main">
            {address}
            <br />
            {location}
          </Typography>
        </CardContent>
      </Link>
    </Card >
  );
}

export default BoardingCard