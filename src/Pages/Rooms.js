import { Box } from "@mui/material"
import { useState } from "react"
import BreadCrumbs from "../Components/BreadCrumbs"
import RoomCard from "../Components/RoomCard"
import SearchFilter from "../Components/SearchFilter/SearchFilter"

const roomCard = {
  id: 123,
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTu0VIKsqE9tOuNIcZ5WhKczC24bPbs2vx4g&usqp=CAU",
  roomNo: 486,
  availablity: "Unvailable",
  price: 4500,
  type: "Share",
  persons: 2
}

const rooms = [
  roomCard, roomCard, roomCard, roomCard, roomCard, roomCard, roomCard, roomCard
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
    name: "Type",
    values: [
      {
        name: "None",
        value: ""
      },
      {
        name: "Single",
        value: "1"
      },
      {
        name: "Share",
        value: "2"
      },
    ]
  },
]
const roomList = [
  { title: 'The Shawshank Redemption', verified: true, available: false, year: 1994 },
  { title: 'The Godfather', verified: true, available: true, year: 1972 },
  { title: 'The Godfather: Part II', verified: false, available: false, year: 1974 },
  { title: 'The Dark Knight', verified: false, available: true, year: 2008 },
  { title: '12 Angry Men', verified: true, available: false, year: 1957 },
  { title: "Schindler's List", verified: true, available: true, year: 1993 },
  { title: 'Pulp Fiction', verified: false, available: false, year: 1994 },
];
const Rooms = () => {

  const [dataFilter, setDataFilter] = useState(roomList)

  return (
    <Box my={5} ml={8} display="flex" flexDirection="column">
      <BreadCrumbs />
      <Box display="flex" my={2} alignItems="center" justifyContent="space-between">
        <SearchFilter list={roomList} options={opts} setData={setDataFilter} />
      </Box>
      <Box display="flex" flexWrap="wrap" >
        {
          rooms.map(card => {
            return (
              <RoomCard {...card} />
            )
          })
        }
      </Box>
    </Box>

  )
}

export default Rooms

