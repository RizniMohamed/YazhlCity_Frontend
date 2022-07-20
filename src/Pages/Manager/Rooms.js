import { Box } from "@mui/material"
import { useState } from "react"
import BreadCrumbs from "../../Components/BreadCrumbs"
import RoomCard from "../../Components/RoomCard"
import SearchFilter from "../../Components/SearchFilter/SearchFilter"
import { messageActions } from '../../Store/messageSlice';
import { useDispatch } from "react-redux"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const roomCard1 = {
  id: 123,
  image: "https://www.japan-guide.com/g21/2030_01.jpg",
  roomNo: 123,
  availablity: "Available",
  price: 3500,
  type: "Share",
  persons: 3
}
const roomCard2 = {
  id: 456,
  image: "https://gds-storage-prd.s3.amazonaws.com/a360-rendering/160628/8597/c4dfe2c1/thumbnails/raasrendering-e13c9919-f597-4c76-a131-536b74947ebe-3500-3500.jpg",
  roomNo: 456,
  availablity: "Unvailable",
  price: 4000,
  type: "Share",
  persons: 2
}
const roomCard3 = {
  id: 789,
  image: "https://5.imimg.com/data5/IB/UP/GLADMIN-9778489/hostel-facilities-500x500.jpg",
  roomNo: 789,
  availablity: "Available",
  price: 6000,
  type: "Single",
  persons: 1
}

const rooms = [
  roomCard1, roomCard2, roomCard3
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

  const dispatch = useDispatch()

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
      <Fab size="small" color="secondary" sx={{ position: "fixed", bottom: 20, right: 16 }}>
        <AddIcon />
      </Fab>
    </Box>

  )
}

export default Rooms

