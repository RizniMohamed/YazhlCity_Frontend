import React from 'react'
import { Box, Button, DialogContent, TextField, Typography } from '@mui/material'
import { useState } from 'react';
import defaultImage from '../../LocalData/default_image.jpg'
const WashBath = ({ formik, renderData, renderImages, name, defaultValues }) => {

    const [images, setImages] = useState({
        bathroomImage: defaultValues ? defaultValues.bathroomImage : defaultImage,
        washroomImage: defaultValues ? defaultValues.washroomImage : defaultImage,
    })

    const onImageChange = (e) => {
        formik.values[e.target.name] = e.target.files[0]
        const image = URL.createObjectURL(e.target.files[0])
        setImages({ ...images, [e.target.name]: image })
    }

    return (
        <DialogContent sx={{ display: "flex", flexDirection: "column", pt: 1, }}>
            <Typography fontWeight={500} fontSize={14} sx={{ mb: 0.3, ml: 1 }} >{name}</Typography>
            <Box border="1px solid #B4B4B4" borderRadius={5} p={2}>
                {renderData.map((data, i) => {
                    return (
                        <Box key={i} mb={2} width={"100%"} >
                            <Typography fontWeight={500} fontSize={14} sx={{ mb: 0.3, ml: 0.5 }} >{data.name}</Typography>
                            <TextField
                                variant="outlined"
                                defaultValue={defaultValues ? defaultValues[data.value] : ""}
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

                <Typography fontWeight={500} fontSize={14} sx={{ mb: 0.3, ml: 0.5 }} >{name} Image</Typography>
                <Box display="flex" justifyContent="space-between" width={300} >
                    <Button variant="text" component="label" size="small" sx={{ p: 0 }} >
                        <Box
                            component="img"
                            src={images[renderImages.name]}
                            alt={renderImages.alt}
                            width={160}
                            height={90}
                            border={Boolean(formik.errors[renderImages.name]) && "1px solid red"}
                            borderRadius={2} />
                        <input
                            hidden
                            accept="image/*"
                            multiple
                            type="file"
                            name={renderImages.name}
                            onChange={onImageChange} />
                    </Button>
                </Box>
            </Box>
        </DialogContent>
    )
}

export default WashBath