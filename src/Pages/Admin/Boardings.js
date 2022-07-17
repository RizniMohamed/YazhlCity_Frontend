import { Box, Typography } from "@mui/material"
import { useState } from "react"
import { useSelector } from "react-redux"
import BoardingCard from "../../Components/BoardingCard"
import BreadCrumbs from "../../Components/BreadCrumbs"
import SearchFilter from "../../Components/SearchFilter/SearchFilter"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const boardingCard = {
  id: 12,
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-rKKyNJtcuwuG61KFJKfmLgb0lG8OjNzFzg&usqp=CAU",
  name: "Boarding Name",
  availablity: "Available",
  rating: 3,
  location: 'Puttalam',
  address: "No 59, 6th lane spill road"
}

const boardings = [
  boardingCard, boardingCard, boardingCard, boardingCard, boardingCard, boardingCard, boardingCard, boardingCard
]
const opts = [
  {
    name: "None",
    values: [
      {
        name: "None",
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
  {
    name: "Location",
    values: [
      {
        name: "None",
        value: ""
      },
      {
        name: "chavahavakachcheri",
        value: "chavahavakachcheri"
      },
    ]
  },
]
const boardingList = [
  { title: 'The Shawshank Redemption', verified: true, available: false, year: 1994 },
  { title: 'The Godfather', verified: true, available: true, year: 1972 },
  { title: 'The Godfather: Part II', verified: false, available: false, year: 1974 },
  { title: 'The Dark Knight', verified: false, available: true, year: 2008 },
  { title: '12 Angry Men', verified: true, available: false, year: 1957 },
  { title: "Schindler's List", verified: true, available: true, year: 1993 },
  { title: 'Pulp Fiction', verified: false, available: false, year: 1994 },
];
const Boardings = () => {

  const [dataFilter, setDataFilter] = useState(boardingList)
  const auth = useSelector(state => state.auth)

  return (
    <Box my={5} ml={8} display="flex" flexDirection="column">
      <BreadCrumbs />
      <Box display="flex" my={2} alignItems="center" justifyContent="space-between">
        <SearchFilter list={boardingList} options={opts} setData={setDataFilter} />
        {auth.role == "user" &&
          <Typography fontWeight={900} fontSize={20} sx={{ mr: 10 }}>Register Boarding</Typography>
        }
      </Box>

      <Box display="flex" flexWrap="wrap" >
        {
          boardings.map(card => {
            return (
              <BoardingCard {...card} />
            )
          })
        }
      </Box>
      
      <Fab size="small" color="secondary" sx={{ position:"fixed", bottom:20, right:16}}>
        <AddIcon />
      </Fab>

    </Box>

  )
}

export default Boardings 