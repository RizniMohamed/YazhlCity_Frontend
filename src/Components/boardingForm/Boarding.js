import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Button, DialogContent, IconButton, Paper, Popper, TextField, Typography } from '@mui/material'
import defaultImage from '../../LocalData/default_image.jpg'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Map from '../Map'
import { store } from "../../Store/store"
import { useDispatch, useSelector } from 'react-redux';
import { messageActions } from '../../Store/messageSlice';
import { getLocations } from '../../services/Boardings';
import { getUsers } from '../../services/user';

const Boarding = ({ formik }) => {

    const auth = useSelector(state => state.auth)
    const [anchorEl, setAnchorEl] = useState(null);

    const [renderData, setRenderData] = useState([
        { name: "Boarding Name", value: "boardingName", },
        { name: "Owner Name", value: "ownerName", options: { disabled: true } },
        { name: "Boarding Mobile", value: "boardingMobile", options: {type : "number", placeholder: "Enter without zero" } },
        { name: "Boarding Address", value: "boardingAddress", },
        { name: "Boarding Description ", value: "boardingDesc", options: { multiline: true, rows: 3 } },
    ]);

    const [locationList, setLocationList] = useState([])
    const dispatch = useDispatch()
    const [images, setImages] = useState({
        boardingImage1: defaultImage,
        boardingImage2: defaultImage,
        boardingImage3: defaultImage,
    })

    const handleLocationClick = () => {
        const { position } = store.getState().map
        if (position.lng && position.lat) {
            formik.values.geoLocation = [position.lng, position.lat]
            setAnchorEl(null);
        }
        else
            dispatch(messageActions.show(['Map required. Drag and drop map marker to set your boarding location on map', 'error']))
    };
    /* eslint-disable */
    useEffect(() => {
        (async () => {
            const locations = await getLocations()
            setLocationList(locations.data.locations)

            const user = await getUsers(`where=id-${auth.userID}`)
            const newRenderData = [...renderData]
            newRenderData[1].options.value = user.data.users[0].name
            setRenderData(newRenderData)
            formik.values.ownerName = user.data.users[0].name
        })()
    }, [])

    const genderList = [
        {name : "Male", value : "male"},
        {name : "Female", value : "female"}
    ]

    const renderImages = [
        { name: "boardingImage1", alt: "boarding image" },
        { name: "boardingImage2", alt: "boarding image" },
        { name: "boardingImage3", alt: "boarding image" },
    ]

    const onImageChange = (e) => {
        formik.values[e.target.name] = e.target.files[0]
        const image = URL.createObjectURL(e.target.files[0])
        setImages({ ...images, [e.target.name]: image })
    }

    const open = Boolean(anchorEl);

    return (
        <DialogContent dividers={true} sx={{ display: "flex", flexDirection: "column", alignSelf: "center", pt: 1 }}>
            {renderData.map((data, i) => {
                return (
                    <Box key={i} mb={2} width={"100%"} >
                        <Typography fontWeight={500} fontSize={14} sx={{ mb: 0.3, ml: 0.5 }} >{data.name}</Typography>
                        <TextField
                            
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
                <Typography fontWeight={500} fontSize={14} sx={{ mb: 0.3, ml: 0.5 }} >Gender</Typography>
                <Autocomplete
                    size='small'
                    options={genderList}
                    onChange={(e, value) => { formik.values.gender = value.value }}
                    getOptionLabel={option => option.name}
                    PaperComponent={params => <Paper {...params} sx={paperStyle} />}
                    sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 0.3 } }}
                    renderInput={(params) => (
                        < TextField
                            {...params}
                            name="gender"
                            placeholder="Gender"
                            onBlur={formik.handleBlur}
                            error={formik.touched.gender && Boolean(formik.errors.gender)}
                            inputProps={{ ...params.inputProps, readOnly: true }}
                            sx={{ minWidth: 200, }}
                        />
                    )}
                />
            </Box>
            <Box mb={2} width={"100%"} >
                <Typography fontWeight={500} fontSize={14} sx={{ mb: 0.3, ml: 0.5 }} >Location</Typography>
                <Autocomplete
                    size='small'
                    options={locationList}
                    onChange={(e, value) => { formik.values.location = value }}
                    getOptionLabel={option => option.name}
                    PaperComponent={params => <Paper {...params} sx={paperStyle} />}
                    sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 0.3 } }}
                    renderInput={(params) => (
                        < TextField
                            {...params}
                            name="location"
                            placeholder="Location"
                            onBlur={formik.handleBlur}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            inputProps={{ ...params.inputProps, readOnly: true }}
                            sx={{ minWidth: 200, }}
                        />
                    )}
                />
            </Box>

            <Typography fontWeight={500} fontSize={14} sx={{ mb: 0.3, ml: 0.5 }} >Boarding Images</Typography>
            <Box display="flex" justifyContent="space-between" width={500} >
                {renderImages.map((image, i) => {
                    return (
                        <Button key={i} variant="text" component="label" size="small" sx={{ p: 0 }} >
                            <Box
                                component="img"
                                src={images[image.name]}
                                alt={image.alt}
                                width={160}
                                height={90}
                                border={Boolean(formik.errors[image.name]) && "1px solid red"}
                                borderRadius={2} />
                            <input
                                hidden
                                accept="image/*"
                                multiple
                                type="file"
                                name={image.name}
                                onChange={onImageChange} />
                        </Button>
                    )
                })}
            </Box>

            <Box display="flex" alignItems="center" mt={3}>
                <Typography fontWeight={500} fontSize={14} sx={{ mb: 0.3, ml: 0.5 }} >Map</Typography>
                <IconButton
                    size='small'
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                    sx={{
                        ml: 2,
                        bgcolor: "background.default",
                        border: Boolean(formik.errors.geoLocation) ? "1px solid red" : "1px solid #B4B4B4"
                    }}>
                    <LocationOnIcon />
                </IconButton>
            </Box>

            <Popper
                open={open}
                anchorEl={anchorEl}
                placement={"right"}
                sx={{ zIndex: 5000 }}>
                <Box sx={{ border: 1, ml: 1, bgcolor: 'background.paper', borderRadius: 2.5 }}>
                    <Map drag={true} mt={0} />
                    <Box display="flex" justifyContent="end">
                        <Button
                            variant="contained"
                            size="small"
                            sx={buttonStyle}
                            onClick={handleLocationClick}>
                            Select
                        </Button>
                    </Box>
                </Box>
            </Popper>

        </DialogContent>


    )
}

export default Boarding

const buttonStyle = {
    m: 1,
    mt: 2,
    width: 100,
    bgcolor: "background.mainbg",
    color: "white",
    "&:hover": {
        bgcolor: "secondary.light",
    }
}

const paperStyle = {
    bgcolor: "background.mainbg",
    borderRadius: 0.3,
    mt: 0.5,
    "li": {
        color: "white",
        px: 2
    },
}