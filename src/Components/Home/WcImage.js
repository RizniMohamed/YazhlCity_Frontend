import React from 'react'
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import mobileimage from '../../Images/Img003.jpg'
import roomimage from '../../Images/img004.jpg'

const WcImage = () => {
    return (
        <div>
            <ImageList variant="standard" cols={2} sx={{ mr: 5, ml: 5, pr: 3, pl: 3 }}>
                <ImageListItem sx={{ mr: 5, ml: 5 }}>
                    <img src={mobileimage} alt="Mobile Image" />
                    <ImageListItemBar position='bottom' title='LOCATION TRACKING' />
                </ImageListItem>

                <ImageListItem sx={{ mr: 5, ml: 5 }} >
                    <img src={roomimage} alt="Room Image" />
                    <ImageListItemBar position='bottom' title='VIEW BOARDING' />
                </ImageListItem>
            </ImageList>
        </div>
    )
}

export default WcImage