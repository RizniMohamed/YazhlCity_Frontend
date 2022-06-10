import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import { Box } from '@mui/system';

const Chips = ({ data, setData }) => {
  const handleClick = (item, index) => {
    const newStates = [...data]
    newStates[index] = {
      name: item.name,
      value: !item.value
    }
    setData(newStates)
  }

  return (
    <Box display="flex" flexWrap="wrap" maxWidth={450} justifyContent="center">
      {
        data.map((item, index) =>

          <Chip
            key={index}
            label={item.name}
            variant={item.value ? "filled" : "outlined"}
            onClick={() => handleClick(item, index)}
            sx={theme => {
              return {
                width: 122,
                m: 1,
                bgcolor: item.value ? theme.palette.background.mainbg : theme.palette.border,
                color: item.value ? "White" : "Black",
                ":hover": {
                  bgcolor: `${item.value ? theme.palette.background.mainbg : theme.palette.border} !important`
                }

              }
            }
            } >
          </Chip>
        )
      }
    </Box>
  )
}

export default Chips