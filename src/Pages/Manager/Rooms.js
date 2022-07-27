import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import BreadCrumbs from "../../Components/BreadCrumbs"
import RoomCard from "../../Components/RoomCard"
import SearchFilter from "../../Components/SearchFilter/SearchFilter"
import { getRooms } from "../../services/Room"
import { messageActions } from "../../Store/messageSlice"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

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
        value: "single"
      },
      {
        name: "Share",
        value: "share"
      },
    ]
  },
]

const Rooms = () => {
  const dispatch = useDispatch()
  const [rooms, SetRooms] = useState(undefined)

  useEffect(() => {
    (async () => {
      const rooms = await getRooms()
      if (rooms.status !== 200) return
      const temp_rooms = []
      rooms.data.rooms.forEach(({ id, image, room_number, availability, type, person_count, price }) => {
        temp_rooms.push({
          id: id,
          image: image,
          roomNo: room_number,
          availablity: availability,
          price: price,
          type: type,
          persons: person_count
        })
      })
      SetRooms(temp_rooms)
    })()
    // eslint-disable-next-line
  }, [])

  if (!rooms) return (
    <Box display="flex" alignItems="center" justifyContent="center" height={"90vh"} width={"100%"}>
      <Typography variant="h5" fontWeight={900}>No Rooms found :(</Typography>
      <Fab size="small" color="secondary" sx={fabStyle}>
        <AddIcon />
      </Fab>
    </Box>
  )

  return (
    <Box my={5} ml={8} display="flex" flexDirection="column">
      <BreadCrumbs />
      <Box display="flex" my={2} alignItems="center" justifyContent="space-between">
        <SearchFilter list={rooms} options={opts} setData={SetRooms} variant={"room"} />
      </Box>
      <Box display="flex" flexWrap="wrap" >
        {rooms.map((card, i) => <RoomCard key={i} {...card} />)}
      </Box>
    </Box>

  )
}

export default Rooms

const fabStyle = {
  position: "fixed",
  bottom: 20,
  right: 16,
  "&:hover" : {
    bgcolor:"primary.main"
  }
}