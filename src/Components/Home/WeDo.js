import { Box, Typography } from '@mui/material'
import React from 'react'

const WeDo = () => {
    return (
        <div>
            <Box component="span" sx={{ p: '5px' }}>
                <Typography
                    align='center'
                    sx={{
                        color: "Black",
                        fontSize: 45,
                        fontWeight: 1000,
                        mb: 2

                    }}>What we do</Typography>

                <Typography
                    align='center'
                    sx={{ mr: 5, ml: 5, pr: 3, pl: 3 }}>

                    People who are moving on into a new place from their native place for their studies or job needs.
                    They will feel like lost in a forest. We guide them by providing this system that can help them to
                    find shelter, medical shops, and vehicle repair shops and also reduce the efforts to get using remote
                    access. This system provides handy facilities to manage the business managerial tasks and support their
                    decision-making actions.

                </Typography>
            </Box>
        </div>
    )
}

export default WeDo