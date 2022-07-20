import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import BoardingCard from "../Components/BoardingCard"
import BreadCrumbs from "../Components/BreadCrumbs"
import SearchFilter from "../Components/SearchFilter/SearchFilter"
import { getBoardings } from "../services/Boardings"

const opts = [
  {
    name: "None",
    values: [{ name: "None", value: "" }]
  },
  {
    name: "Verified",
    values: [
      { name: "None", value: "" },
      { name: "True", value: "true" },
    ]
  },
  {
    name: "Location",
    values: []
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
  const [boardings, setBoardings] = useState([])
  const [filterOptions, setFilterOptions] = useState(opts)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    (async () => {
      const { boardings } = await getBoardings()
      const temp_boardings = []
      const temp_locations = [{ name: "None", value: "" }]
      const temp_boardingNames = []
      boardings.forEach(({ id, Location, name, Boarding_images, address, verified, rating }) => {
        temp_locations.push({
          name: Location.name,
          value: Location.id
        })
        temp_boardings.push({
          id: id,
          image: "http://localhost:5000/" + Boarding_images[0].image,
          name: name,
          rating: rating,
          verified: verified,
          location: Location.name,
          address: address
        })
        temp_boardingNames.push(name)
      })

      filterOptions[2].values = temp_locations
      setBoardings(temp_boardings)
      setFilterOptions(filterOptions)
    })()
  }, [])

  return (
    <Box my={5} ml={8} display="flex" flexDirection="column">
      <BreadCrumbs />
      <Box display="flex" my={2} alignItems="center" justifyContent="space-between">
        <SearchFilter list={boardings} options={filterOptions} setData={setBoardings} variant="boarding" />
        {auth.role == "user" &&
          <Typography fontWeight={900} fontSize={20} sx={{ mr: 10 }}>Register Boarding</Typography>
        }
      </Box>
      <Box display="flex" flexWrap="wrap" >
        {boardings.map((card, index) => <BoardingCard key={index} {...card} />)}
      </Box>
    </Box>

  )
}

export default Boardings 