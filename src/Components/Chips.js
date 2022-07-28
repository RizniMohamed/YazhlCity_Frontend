import Chip from '@mui/material/Chip';
import { Box } from '@mui/system';
import React from 'react';

const Chips = ({ data, setData, disabled = false }) => {
  const handleClick = (item, index) => {
    const newStates = [...data]
    newStates[index] = {
      id: item.id,
      name: item.name,
      status: !item.status
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
            variant={item.status ? "filled" : "outlined"}
            onClick={() => handleClick(item, index)}
            sx={theme => {
              return {
                width: 100,
                m: 1,
                cursor: disabled ? "default" : "pointer",
                bgcolor: item.status ? theme.palette.background.mainbg : theme.palette.border,
                color: item.status ? "White" : "Black",
                ":hover": {
                  bgcolor: `${item.status ? theme.palette.background.mainbg : theme.palette.border} !important`
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