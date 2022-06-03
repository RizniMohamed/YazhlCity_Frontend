import React from 'react'
import { TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'

const CardInputs = ({ handleChange}) => {
    return (
        <>
            <Box my={1} >
                <Typography fontWeight={700} sx={{ p: 0, m: 0 }} >Cardholder Name</Typography>
                <TextField
                    multiline
                    variant="outlined"
                    size='small'
                    placeholder="Full name"
                    name="cardholderName"
                    onChange={e => handleChange(e.target)}
                    sx={{ width: 250 }}
                />
            </Box>
            <Box my={1} >
                <Typography fontWeight={700} sx={{ p: 0, m: 0 }} >Card Number</Typography>
                <TextField
                    multiline
                    variant="outlined"
                    size='small'
                    placeholder="0000-0000-0000-0000"
                    name="cardNumber"
                    onChange={e => handleChange(e.target)}
                    sx={{ width: 250 }}
                />
            </Box>
            <Box my={1} display="flex" justifyContent="space-between">
                <Box>
                    <Typography fontWeight={700} sx={{ p: 0, m: 0 }} >Exp. Month</Typography>
                    <TextField
                        multiline
                        variant="outlined"
                        size='small'
                        placeholder="00"
                        name="expMonth"
                        onChange={e => handleChange(e.target)}
                        sx={{ width: 120 }}
                    />
                </Box>
                <Box>
                    <Typography fontWeight={700} sx={{ p: 0, m: 0 }} >Exp. Year</Typography>
                    <TextField
                        multiline
                        variant="outlined"
                        size='small'
                        placeholder="0000"
                        name="expYear"
                        onChange={e => handleChange(e.target)}
                        sx={{ width: 120 }}
                    />
                </Box>
            </Box>
            <Box my={1} >
                <Typography fontWeight={700} sx={{ p: 0, m: 0 }} >CVC Number</Typography>
                <TextField
                    multiline
                    variant="outlined"
                    size='small'
                    placeholder="000"
                    name="cvc"
                    onChange={e => handleChange(e.target)}
                    sx={{ width: 250 }}
                />
            </Box>
        </>
    )
}

export default CardInputs