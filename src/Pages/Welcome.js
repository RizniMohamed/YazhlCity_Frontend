import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import Footer from '../Components/Footer'
import BannerBG from '../LocalData/WelcomePage/BannerBG.png'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Link } from 'react-router-dom';
import WeDo from '../Components/Home/WeDo';
import WcImage from '../Components/Home/WcImage';

const Welcome = () => {
  return (
    <>
      {/* Banner */}
      <Box position="relative">
        <Box component='img' src={BannerBG} alt="Banner Image" width="100vw" />
        <Box
          position="absolute"
          transform="translate(-50%,-50%)"
          top="calc(50% - 64px)"
          left="calc(50% - 125px)"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography
            sx={{
              color: "white",
              fontSize: 45,
              fontWeight: 1000,
              mb: 2
            }}>YAZHL CITY</Typography>
          <Link to="Boardings">
            <Button
              variant="contained"
              size='small'
              sx={{
                color: "white",
                fontSize: 22,
                fontWeight: 900,
                width: 250
              }}  >
              Boarding
              <ArrowCircleRightOutlinedIcon fontSize='large' sx={{ ml: 0.5 }} />
            </Button>


          </Link>
        </Box>

      </Box>
      <WeDo />
      <WcImage />
      <Footer />
    </>
  )

}

export default Welcome

