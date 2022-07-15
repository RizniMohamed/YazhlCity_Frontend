import React from 'react'
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import mobileimage from '../../LocalData/WelcomePage/Group 94 (1).png'
import roomimage from '../../LocalData/WelcomePage/Group 95.png'

const WcImage = () => {
    return (
        <div>
            <ImageList variant="standard" cols={2} sx={{ mr: 5, ml: 5, pr: 3, pl: 3 }}>
                <ImageListItem sx={{ mr: 5, ml: 5 }}>
                    <img src={mobileimage} alt="Mobile Image" />
                    <ImageListItemBar position='bottom' />
                </ImageListItem>

                <ImageListItem sx={{ mr: 5, ml: 5 }} >
                    <img src={roomimage} alt="Room Image" />
                    <ImageListItemBar position='bottom' />
                </ImageListItem>
            </ImageList>
        </div>
    )
}

export default WcImage