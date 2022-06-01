import { CardMedia } from '@mui/material'
import React from 'react'
import Carousel from 'react-material-ui-carousel'

const BRImage = ({ images }) => {
    return (
        <Carousel
            sx={{
                width: 400,
                height: 300,
                borderRadius: 0.5,
                borderColor: "border",
                borderStyle: "solid",
                borderWidth: 1,
                boxShadow: 10,
            }}
        >
            {
                images.map(({ name, path }, i) =>
                    <CardMedia key={i} component="img" width={400} height={300} image={path} alt={name} />
                )
            }
        </Carousel>
    )
}

export default BRImage