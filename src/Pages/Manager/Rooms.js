import { Grid } from '@mui/material';
import React from 'react'
import BoardingCard from '../../Components/BoardingCard'

const arrayOfObjects = [
  { coffe: "Americano", size: "Medium" },
  { coffe: "Americano", size: "Medium" },
  { coffe: "Espresso", size: "Single" },
];

export default function Rooms() {
  return (
    <div style={{ width: '100%' }}>
      <Grid container spacing={2} justifyContent="space-around" alignItems="center" sx={{ m: 5, p: 5 }}>
        {
          arrayOfObjects.map(() => {
            <span> helloo </span>
            return <Grid item xs={4}>
              <BoardingCard />
            </Grid>
          })
        }
      </Grid>
    </div>

  )
} 