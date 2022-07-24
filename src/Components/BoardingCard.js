import React from 'react';
import { Rating } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';


const
  BoardingCard = ({ id, image, name, rating, location, address, verified }) => {
    return (

      <Card raised sx={{ width: 210, height: 270, mt: 2, mr: 3 }}>
        <Link to={`${id}`}>
          <CardMedia
            component="img"
            alt={name}
            height="140"
            image={image}
          />
          <CardContent sx={{ pt: 1 }}>
            <Box mb={1} >
              <Typography sx={{ fontSize: 17, fontWeight: 700, display: "flex", alignItems: "center" }}>
                {name}
                {verified && <VerifiedUserIcon fontSize="small" sx={{ color: "#699BF7", ml: 0.5 }} />}
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