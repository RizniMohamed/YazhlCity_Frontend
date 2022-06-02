import { Box, Typography } from '@mui/material'
import React from 'react'

const BRTable = ({ rows, firstColWidth}) => {
    return (
        <>
            {
                rows.map((details, index) => (
                    (index === rows.length - 1) ? "" : (
                        <Box height={62} display="flex" key={index} >
                            <Typography sx={{ fontWeight: 700, fontSize: 18, width: firstColWidth }}>{details.name}</Typography>
                            <Typography sx={{ fontWeight: 700, fontSize: 18, width: 50, textAlign: "center" }}>:</Typography>
                            <Typography sx={{ fontSize: 18 }}>{details.details}</Typography>
                        </Box>
                    )
                ))
            }
            <Box display="flex" flexDirection="column">
                <Typography sx={{ fontWeight: 700, fontSize: 18 }}>{rows[rows.length - 1].name}</Typography>
                <Typography align='justify' sx={{ fontSize: 15, width: 675 }} variant="body1">{rows[rows.length - 1].details}</Typography>
            </Box>
        </>
    )
}

export default BRTable