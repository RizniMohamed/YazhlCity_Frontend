import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import Footer from '../Components/Footer'
import BannerBG from '../LocalData/WelcomePage/BannerBG.png'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Link } from 'react-router-dom';
import mobileimage from '../LocalData/WelcomePage/room01.png'
import roomimage from '../LocalData/WelcomePage/room02.png'
import visionimage from '../LocalData/WelcomePage/Group 96.png'

const Welcome = () => {

  return (
    <>
      {/* Banner */}
      <Box position="relative">
        <Box component='img' src={BannerBG} alt="Banner Image" width="calc(100vw - 2px)" />
        <Box
          position="absolute"
          transform="translate(-50%,-50%)"
          top="calc(50% - 64px)"
          left="calc(50% - 125px)"
          display="flex"
          flexDirection="column"
          alignItems="center" >
          <Typography sx={{ color: "white", fontSize: 45, fontWeight: 1000, mb: 2 }}>
            YAZHL CITY
          </Typography>
          <Link to="boardings">
            <Button
              variant="contained"
              size='small'
              sx={{ color: "white", fontSize: 22, fontWeight: 900, width: 250 }}  >
              Boarding
              <ArrowCircleRightOutlinedIcon fontSize='large' sx={{ ml: 0.5 }} />
            </Button>
          </Link>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center" my={5}>

        <Typography
          align='center'
          sx={{ color: "text.primary", fontSize: 36, fontWeight: 1000, }}>
          What we do
        </Typography>

        <Typography
          align='center'
          fontSize={20}
          lineHeight={2}
          sx={{ width: 850 }}>
          People who are moving on into a new place from their native place for their studies or job needs.
          They will feel like lost in a forest. We guide them by providing this system that can help them to
          find shelter, medical shops, and vehicle repair shops and also reduce the efforts to get using remote
          access. This system provides handy facilities to manage the business managerial tasks and support their
          decision-making actions.
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-evenly">
        <Box component="img" width={600} src={mobileimage} alt="Mobile Image" />
        <Box component="img" width={600} src={roomimage} alt="Room Image" />
      </Box>

      <Box display="flex" justifyContent="space-evenly">
        <Box component="img" width={500} src={visionimage} alt="Vision Image" my={5} />
      </Box>
      <Footer />
    </>
  )

}

export default Welcome

