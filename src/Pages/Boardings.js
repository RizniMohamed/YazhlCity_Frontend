import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import BoardingCard from "../Components/BoardingCard"
import BreadCrumbs from "../Components/BreadCrumbs"
import SearchFilter from "../Components/SearchFilter/SearchFilter"
import { getBoardings } from "../services/Boardings"
import { dialogActions } from "../Store/dialogSlice"

const opts = [
  {
    name: "None",
    values: [{ name: "None", value: "" }]
  },
  {
    name: "Gender",
    values: [
      { name: "None", value: "" },
      { name: "Male", value: "male" },
      { name: "Female", value: "female" },
    ]
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
    values: [{ name: "None", value: "" }]
  },
]

const Boardings = () => {
  const dispatch = useDispatch()
  const [boardings, setBoardings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterOptions, setFilterOptions] = useState(opts)
  const auth = useSelector(state => state.auth)


  useEffect(() => {
    (async () => {
      const boardings = await getBoardings()
      if (boardings.status !== 200) {
        setLoading(false)
        return
      }
      const temp_boardings = []
      const temp_locations = [{ name: "None", value: "" }]
      boardings.data.boardings.forEach(({ id, Location, name, Boarding_images, address, verified, rating }) => {
        temp_locations.push({
          name: Location.name,
          value: Location.id
        })
        temp_boardings.push({
          id: id,
          image: Boarding_images[0].image,
          name: name,
          rating: rating,
          verified: verified,
          location: Location.name,
          address: address
        })
      })

      filterOptions[3].values = temp_locations
      setBoardings(temp_boardings)
      setFilterOptions(filterOptions)
      setLoading(false)
    })()
    // eslint-disable-next-line
  }, [auth.role])

  if (loading) return (
    <Box display="flex" alignItems="center" justifyContent="center" height={"90vh"}>
      <Typography variant="h5" fontWeight={900}>Loading...</Typography>
    </Box>
  )

  return (
    <Box my={5} ml={8} display="flex" flexDirection="column">
      <BreadCrumbs />
      <Box display="flex" my={2} alignItems="center" justifyContent="space-between">
        <SearchFilter list={boardings} options={filterOptions} setData={setBoardings} variant="boarding" />
        {auth.role === "user" &&
          <Typography
            fontWeight={900}
            fontSize={20}
            sx={{ mr: 10, cursor: "pointer" }}
            onClick={() =>
              // eslint-disable-next-line
              dispatch(dialogActions.show(['boardingForm', , { variant: "create"}]))
            }>
            Register Boarding
          </Typography>
        }
      </Box>

      {
        (!loading && boardings.length === 0) ? (
          <Box display="flex" alignItems="center" justifyContent="center" height={"55vh"}>
            <Typography variant="h5" fontWeight={900}>No boardings found :(</Typography>
          </Box>
        ) : (
          <Box display="flex" flexWrap="wrap" >
            {boardings.map((card, index) => <BoardingCard key={index} {...card} />)}
          </Box>
        )
      }


    </Box>

  )
}

export default Boardings 