import React from 'react'
import { Box, Typography, TextField, InputAdornment } from '@mui/material';

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
        placeHolder: "000 000 000",
    },
    {
        name: "email",
        displayName: "Email",
        placeHolder: "example@example.com",
    },
]


const UserInputs = (formik) => {


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
                            placeholder={placeHolder}
                            name={name}
                            value={formik.values[name]}
                            sx={{
                                width: 250,
                                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':{display: 'none'},
                            }}
                            onChange={formik.handleChange}
                            error={formik.touched[name] && Boolean(formik.errors[name])}
                            helperText={formik.touched[name] && formik.errors[name]}
                            onBlur={formik.handleBlur}

                            type={name === "mobile" ? "number" : "text"}
                            InputProps={{
                                startAdornment: name === "mobile" ? <InputAdornment position="start">+94</InputAdornment> : "",
                            }}
                        />
                    </Box>
                )
            }
        </>
    )
}

export default UserInputs