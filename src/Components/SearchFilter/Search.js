import React from 'react'
import { Autocomplete, Paper, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { getBoardings } from "../../services/Boardings"

const Search = ({ list, setData, variant }) => {

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
    const filtered_room = async (query) => {
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

    const handleOnInputChange = async (event, value) => {
        if (variant === "boarding") {
            if (value) {
                const filteredData = await filtered_boarding(`where=name-${value}`)
                setData(filteredData)
            } else {
                const allData = await filtered_boarding()
                setData(allData)
            }
        }
        if (variant === "room") {
            if (value) {
                const filteredData = await filtered_room(`where=name-${value}`)
                setData(filteredData)
            } else {
                const allData = await filtered_room()
                setData(allData)
            }
        }
    }

    return (
        <Autocomplete
            freeSolo
            size='small'
            options={list}
            onInputChange={handleOnInputChange}
            getOptionLabel={option => option.name}
            PaperComponent={params =>
                <Paper
                    {...params}
                    sx={paperStyle} />
            }
            sx={autocompleteStyle}
            renderInput={(params) => (
                < TextField
                    {...params}
                    placeholder="Search"
                    sx={{ minWidth: 200, }}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: <SearchIcon sx={{ color: "border", }} />
                    }}
                />
            )}
        />)
}

export default Search


const autocompleteStyle = {
    ".MuiOutlinedInput-root": {
        borderRadius: "25px !important",
    },
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