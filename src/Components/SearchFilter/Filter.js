import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Button, Divider, Menu, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { getBoardings } from '../../services/Boardings';
import { messageActions } from '../../Store/messageSlice';
import {useDispatch} from 'react-redux';

const Filter = ({ list, setData, options, variant }) => {

    const dispatch = useDispatch()

    //Filter
    const [anchorEl, setAnchorEl] = useState(null);
    const [filterKey, setFilterKey] = useState({});
    const open = Boolean(anchorEl);

    const handleClose = () => setAnchorEl(null)

    const filtered_boarding = async (query) => {
        const { boardings } = await getBoardings(query)
        const temp_boardings = boardings.map(({ id, Location, name, Boarding_images, address, verified, rating }) => {
            return {
                id: id,
                image: "http://localhost:5000/" + Boarding_images[0].image,
                name: name,
                rating: rating,
                verified: verified,
                location: Location.name,
                address: address
            }
        })
        return temp_boardings
    }

    const filter = async newKeys => {
        if (newKeys === "none" || (newKeys.Verified === "" && newKeys.Location === "")) {
            const allData = await filtered_boarding()
            setData(allData)
            setFilterKeys()
            return
        }
        if (newKeys.Verified !== "" && newKeys.Location !== "") {
            const query = `where=verified-${newKeys.Verified},locationID-${newKeys.Location}`
            filtered_boarding(query)
                .then(res => setData(res))
                .catch(async e => {
                    dispatch(messageActions.show(["No boardings found on provided criteria", 'info']))
                    const allData = await filtered_boarding()
                    setData(allData)
                    setFilterKeys()
                })
            return
        }
        if (newKeys.Verified !== "") {
            const query = `where=verified-${newKeys.Verified}`
            filtered_boarding(query)
                .then(res => setData(res))
                .catch(async e => {
                    dispatch(messageActions.show(["No boardings found on provided criteria", 'info']))
                    const allData = await filtered_boarding()
                    setData(allData)
                    setFilterKeys()
                })
            return
        }
        if (newKeys.Location !== "") {
            const query = `where=locationID-${newKeys.Location}`
            filtered_boarding(query)
                .then(res => setData(res))
                .catch(async e => {
                    dispatch(messageActions.show(["No boardings found on provided criteria", 'info']))
                    const allData = await filtered_boarding()
                    setData(allData)
                    setFilterKeys()
                })
            return
        }
    }

    const handleSelect = ({ target }) => {
        const newKeys = { ...filterKey, [target.name]: target.value }
        setFilterKey(newKeys)
        filter(newKeys)
    }

    const setFilterKeys = () => {
        let keys = {}
        options.forEach(e => keys[e.name] = "")
        setFilterKey(keys)
    }

    // eslint-disable-next-line
    useEffect(() => setFilterKeys(), [])

    return (
        <Box ml={2}>
            <Button
                size="small"
                sx={{ borderRadius: 1, minWidth: "min-content", color: "secondary.main" }}
                onClick={e => setAnchorEl(e.currentTarget)}
            >
                <FilterAltIcon sx={{ fontSize: 32 }} />
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={menuStyle}>
                {options.map((op, index) =>
                    <Box key={index}>
                        <Box display="flex" alignItems="center">
                            {(index === 0) ? <MenuItem onClick={() => filter("none")} sx={{ width: 1 }}>{op.name}</MenuItem> :
                                <>
                                    <Typography sx={{ width: 100, py: 0.5, px: 2 }} color="white">{op.name}</Typography>
                                    <Select
                                        size='small'
                                        displayEmpty
                                        placeholder="Select"
                                        value={filterKey[op.name]}
                                        name={op.name}
                                        onChange={handleSelect}
                                        sx={selectStyle}
                                        MenuProps={selectPropsStyle}
                                        inputProps={{ sx: { color: "white", } }}>
                                        {op.values.map((val, index) => <MenuItem key={index} value={val.value}>{val.name}</MenuItem>)}
                                    </Select>
                                </>
                            }
                        </Box>
                        {(index !== options.length - 1) && <Divider sx={{ bgcolor: "white", }} />}
                    </Box>
                )}
            </Menu>
        </Box>
    )
}

export default Filter


const menuStyle = {
    ml: 2,
    "li": {
        color: "white",
        py: 0.5,
        px: 2
    },
    ".MuiPaper-root": {
        bgcolor: "background.mainbg",
        borderRadius: 0.3,
    },
    "& .MuiDivider-root": {
        m: "0 !important",
        p: 0
    },
    ".MuiList-root": {
        p: 0
    }
}

const selectStyle = {
    borderRadius: 0,
    borderColor: 'white !important',
    ":hover": {
        borderColor: "red"
    },
    "svg": {
        color: "white"
    },
    "fieldset": {
        border: "none"
    },
    ".MuiList-root": {
        p: 0
    }
}

const selectPropsStyle = {
    sx: {
        ".MuiPaper-root": {
            bgcolor: "background.mainbg",
            borderRadius: 0.3,
        },
        "li": {
            color: "white",
            py: 0.5,
            px: 2
        },
        ".MuiList-root": {
            p: 0
        }
    }
}