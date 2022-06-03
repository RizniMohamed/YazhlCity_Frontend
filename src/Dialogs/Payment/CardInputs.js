import React from 'react'
import { FormControl, FormHelperText, InputLabel, MenuItem, MenuList, OutlinedInput, Paper, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'

const CardInputs = (formik) => {
    return (
        <>
            <Box my={1} >
                <Typography fontWeight={700} sx={{ p: 0, m: 0 }} >Cardholder Name</Typography>
                <TextField
                    variant="outlined"
                    size='small'
                    placeholder="Full name"
                    name="cardholderName"
                    onChange={formik.handleChange}
                    error={formik.touched.cardholderName && Boolean(formik.errors.cardholderName)}
                    helperText={formik.touched.cardholderName && formik.errors.cardholderName}
                    onBlur={formik.handleBlur}
                    sx={{ width: 250 }}
                />
            </Box>
            <Box my={1} >
                <Typography fontWeight={700} sx={{ p: 0, m: 0 }} >Card Number</Typography>
                <TextField
                    variant="outlined"
                    size='small'
                    placeholder="0000-0000-0000-0000"
                    name="cardNumber"
                    onChange={formik.handleChange}
                    error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
                    helperText={formik.touched.cardNumber && formik.errors.cardNumber}
                    onBlur={formik.handleBlur}
                    type="number"
                    sx={{
                        width: 250,
                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': { display: 'none' },
                    }}
                />
            </Box>
            <Box my={1} display="flex" justifyContent="space-between">
                <Box>
                    <Typography fontWeight={700} sx={{ p: 0, m: 0 }} >Exp. Month</Typography>

                    <FormControl error={formik.touched.expMonth && Boolean(formik.errors.expMonth)}>
                        <Select
                            displayEmpty
                            value={formik.values.expMonth}
                            onChange={formik.handleChange}
                            size='small'
                            variant="outlined"
                            name="expMonth"
                            type="number"
                            sx={{
                                width: 120,
                                borderRadius: 0.3,


                            }}
                        >
                            <MenuItem value="">
                                <Typography variant="body1" color="text.secondary">00</Typography>
                            </MenuItem>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((option) => (
                                <MenuItem
                                    sx={{
                                        "&.Mui-selected": {
                                            bgcolor: "red"
                                        }
                                    }}
                                    key={option} value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{formik.touched.expMonth && formik.errors.expMonth}</FormHelperText>
                    </FormControl>

                </Box>
                <Box>
                    <Typography fontWeight={700} sx={{ p: 0, m: 0 }} >Exp. Year</Typography>
                    <TextField

                        variant="outlined"
                        size='small'
                        placeholder="0000"
                        name="expYear"
                        onChange={formik.handleChange}
                        error={formik.touched.expYear && Boolean(formik.errors.expYear)}
                        helperText={formik.touched.expYear && formik.errors.expYear}
                        onBlur={formik.handleBlur}
                        type="number"
                        sx={{
                            width: 120,
                            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': { display: 'none' },
                        }}
                    />
                </Box>
            </Box>
            <Box my={1} >
                <Typography fontWeight={700} sx={{ p: 0, m: 0 }} >CVC Number</Typography>
                <TextField
                    variant="outlined"
                    size='small'
                    placeholder="000"
                    name="cvc"
                    onChange={formik.handleChange}
                    error={formik.touched.cvc && Boolean(formik.errors.cvc)}
                    helperText={formik.touched.cvc && formik.errors.cvc}
                    onBlur={formik.handleBlur}
                    type="number"
                    sx={{
                        width: 250,
                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': { display: 'none' },
                    }}
                />
            </Box>
        </>
    )
}

export default CardInputs