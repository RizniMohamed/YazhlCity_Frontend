import { Box } from '@mui/system'
import React, { useState } from 'react'
import Chips from '../../Components/Chips';
import SearchFilter from '../../Components/SearchFilter/SearchFilter'


const boardingList = [
  { title: 'The Shawshank Redemption', verified: true, available: false, year: 1994 },
  { title: 'The Godfather', verified: true, available: true, year: 1972 },
  { title: 'The Godfather: Part II', verified: false, available: false, year: 1974 },
  { title: 'The Dark Knight', verified: false, available: true, year: 2008 },
  { title: '12 Angry Men', verified: true, available: false, year: 1957 },
  { title: "Schindler's List", verified: true, available: true, year: 1993 },
  { title: 'Pulp Fiction', verified: false, available: false, year: 1994 },
];

const opts = [
  {
    name: "None",
    values: [
      {
        name: "Nonee",
        value: ""
      }
    ]
  },
  {
    name: "Available",
    values: [
      {
        name: "None",
        value: ""
      },
      {
        name: "True",
        value: "true"
      },
    ]
  },
  {
    name: "Verified",
    values: [
      {
        name: "None",
        value: ""
      },
      {
        name: "True",
        value: "true"
      },
    ]
  },
]

const chipList = [
  {
    name: "Mattress",
    value: false
  },
  {
    name: "Bed",
    value: false
  },
  {
    name: "Fan",
    value: true
  },
  {
    name: "Table",
    value: true
  },
  {
    name: "Chair",
    value: true
  },
]


const Rizni = () => {
  const [data, setData] = useState(chipList)

  // const [data, setData] = useState(boardingList)

  console.log(data);

  return (
    <Box p={3}>
      {/* <SearchFilter list={boardingList} options={opts} setData={setData} /> */}
      <Chips data={data} setData={setData} />
    </Box>
  )
}

export default Rizni


