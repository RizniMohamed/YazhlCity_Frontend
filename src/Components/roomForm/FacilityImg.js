import { Box, Button, DialogContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import defaultImage from '../../LocalData/default_image.jpg';
import { getFacilities } from '../../services/Room';
import Chips from '../Chips';

const Facility_Img = ({ formik, defaultValues }) => {

    const [image, setImage] = useState(
        defaultValues ? defaultValues.image : defaultImage,
    )
    const [faclities, setFaclities] = useState()

    useEffect(() => {
        formik.values.facilities = faclities?.filter(facility => facility?.status === true)
        //eslint-disable-next-line
    }, [faclities])

    const onImageChange = (e) => {
        formik.values.image = e.target.files[0]
        const new_image = URL.createObjectURL(e.target.files[0])
        setImage(new_image)
    }

    const loadData = async () => {
        const res = await getFacilities()
        if (res.status !== 200) return
        setFaclities(res.data)
    }

    useEffect(() => {
        loadData()
        //eslint-disable-next-line
    }, [])


    return (
        <DialogContent dividers={true} sx={{ display: "flex", flexDirection: "column", alignSelf: "center", pt: 1 }}>

            <Box my={1}>
                <Typography fontWeight={500} fontSize={14} sx={{ mb: 0.3, ml: 0.5 }} >Facilities</Typography>
                {faclities && <Chips data={faclities} setData={setFaclities} />}
            </Box>

            <Typography fontWeight={500} fontSize={14} sx={{ mb: 0.3, ml: 0.5 }} >Room Image</Typography>
            <Box display="flex" justifyContent="space-between" width={300} >
                <Button variant="text" component="label" size="small" sx={{ p: 0 }} >
                    <Box
                        component="img"
                        src={image}
                        alt={"Room Image"}
                        width={160}
                        height={90}
                        border={Boolean(formik.errors.image) && "1px solid red"}
                        borderRadius={2} />
                    <input
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        name={"image"}
                        onChange={onImageChange} />
                </Button>
            </Box>
        </DialogContent>


    )
}

export default Facility_Img

