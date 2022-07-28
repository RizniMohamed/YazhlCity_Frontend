import { Autocomplete, Box, DialogContent, Paper, TextField, Typography } from '@mui/material';
import React from 'react';

const Room = ({ formik, defaultValues }) => {

    const renderData = [
        { name: "Room Number", value: "room_number", options: { type: "number", inputProps:{step:"any"} } },
        { name: "Person Count", value: "person_count", options: { type: "number", inputProps:{step:"any"} } },
        { name: "Price", value: "price", options: { type: "number", inputProps:{step:"any"} } },
        { name: "Description", value: "description", options: { multiline: true, rows: 3 } },
    ]

    const typeList = [
        { name: "Single", value: "single" },
        { name: "Share", value: "share" }
    ]

    const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1)

    return (
        <DialogContent dividers={true} sx={{ display: "flex", flexDirection: "column", alignSelf: "center", pt: 1 }}>
            {renderData.map((data, i) => {
                return (
                    <Box key={i} mb={2} width={"100%"} >
                        <Typography fontWeight={500} fontSize={14} sx={{ mb: 0.3, ml: 0.5 }} >{data.name}</Typography>
                        <TextField
                            defaultValue={defaultValues ? defaultValues[data.value] : null}
                            variant="outlined"
                            size='small'
                            type="text"
                            placeholder={data.name.toString()}
                            name={data.value.toString()}
                            sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 0.3 } }}
                            onChange={formik.handleChange}
                            error={formik.touched[data.value] && Boolean(formik.errors[data.value])}
                            onBlur={formik.handleBlur}
                            {...data?.options}
                        />
                    </Box>
                )
            })}

            <Box mb={2} width={"100%"} >
                <Typography fontWeight={500} fontSize={14} sx={{ mb: 0.3, ml: 0.5 }} >Room Type</Typography>
                <Autocomplete
                    size='small'
                    defaultValue={defaultValues ? { name: capitalizeFirstLetter(defaultValues.type), value: defaultValues.type } : null}
                    options={typeList}
                    onChange={(e, value) => { formik.values.type = value.value }}
                    getOptionLabel={option => option.name}
                    PaperComponent={params => <Paper {...params} sx={paperStyle} />}
                    sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 0.3 } }}
                    renderInput={(params) => (
                        < TextField
                            {...params}
                            name="type"
                            placeholder="Room Type"
                            onBlur={formik.handleBlur}
                            error={formik.touched.type && Boolean(formik.errors.type)}
                            inputProps={{ ...params.inputProps, readOnly: true }}
                            sx={{ minWidth: 200, }}
                        />
                    )}
                />
            </Box>

        </DialogContent>

    )
}

export default Room

const paperStyle = {
    bgcolor: "background.mainbg",
    borderRadius: 0.3,
    mt: 0.5,
    "li": {
        color: "white",
        px: 2
    },
}