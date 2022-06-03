import React from 'react'
import { Box, Typography, TextField } from '@mui/material';

const data = [
    {
        name: "fullName",
        displayName: "Full Name",
        placeHolder: "Full name",
    },
    {
        name: "address",
        displayName: "Address",
        placeHolder: "No - Address",
    },
    {
        name: "mobile",
        displayName: "Mobile",
        placeHolder: "+94 00000000",
    },
    {
        name: "email",
        displayName: "Email",
        placeHolder: "example@example.com",
    },
]


const UserInputs = ({handleChange}) => {
    return (
        <>
            {
                data.map(({ name, placeHolder, displayName }, index) =>
                    <Box my={1} key={index} >
                        <Typography fontWeight={700} sx={{ p: 0, m: 0 }} >{displayName}</Typography>
                        <TextField
                            inputProps={{
                                autoComplete: 'off',
                            }}
                            variant="outlined"
                            size='small'
                            type=""
                            placeholder={placeHolder}
                            name={name}
                            onChange={e => handleChange(e.target)}
                            sx={{ width: 250 }}
                        />
                    </Box>
                )
            }
        </>
    )
}

export default UserInputs