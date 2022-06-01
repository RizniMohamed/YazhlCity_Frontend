import { Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import BoardingCard from '../../Components/BoardingCard'
import BoardingDetails from '../../Components/BoardingDetails'
import RoomCard from '../../Components/RoomCard'
import SidePanel from '../../Components/SidePanel'
import adminData from "../../LocalData/Drawer/AdminDrawerData"
import managerData from "../../LocalData/Drawer/ManagerDrawerData"
import profileData from "../../LocalData/Drawer/ProfileDrawerData"

const Rizni = () => {
  const roles = [
    {
      role: "admin",
      data: adminData
    },
    {
      role: "manager",
      data: managerData
    },
    {
      role: "profile",
      data: profileData
    },
  ]

  const boarding = [
    {
      id: Date.now(),
      name: "Rizni House",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Boott_Boardinghouse_Store.jpg",
      availablity: "Unavailable",
      rating: 4,
      address: "No 59, 6th Lane, Spill Road",
      location: "Puttalam, Manalkundru"
    },
    {
      id: Date.now(),
      name: "Rizni House",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Boott_Boardinghouse_Store.jpg",
      availablity: "Available",
      rating: 4,
      address: "No 59, 6th Lane, Spill Road",
      location: "Puttalam, Manalkundru"
    },
  ]


  const rooms = [
    {
      id: Date.now(),
      roomNo: 12,
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Boott_Boardinghouse_Store.jpg",
      availablity: "Unavailable",
      price: "4500",
      type: "Single",
      persons: "Full"
    },
    {
      id: Date.now(),
      roomNo: 12,
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Boott_Boardinghouse_Store.jpg",
      availablity: "Available",
      price: "4500",
      type: "Single",
      persons: "2 out of 4"
    },

  ]

  // return (
  //   <>
  //     <Routes>
  //       {roles.map(({ role, data }, index) =>

  //         <Route key={index} path={`${role}`} >
  //           {
  //             data.map(({ path }, index) => {
  //               const x = path.split("/")
  //               const name = x[x.length - 1]
  //               if (index === 0)
  //                 return <Route key={index} index element={<SidePanel />} />
  //               else
  //                 return <Route key={index} path={name} element={<SidePanel />} />
  //             })
  //           }
  //         </Route>

  //       )}
  //     </Routes>
  //   </>
  // )

  //   return (
  //     <Box component="main" flexGrow={1} p={3}  >
  //       <Toolbar />
  //       <Box display="flex" flexWrap="wrap" justifyContent={'start'}>
  //         {boarding.map((data, index) =>
  //           <BoardingCard key={index} {...data} />
  //         )}
  //       </Box>
  //     </Box>
  //   )
  // }

  // return (
  //   <Box component="main" flexGrow={1} p={3}  >
  //     <Toolbar />
  //     <Box display="flex" flexWrap="wrap" justifyContent={'start'}>
  //       {rooms.map((data, index) =>
  //         <RoomCard key={index} {...data} />
  //       )}
  //     </Box>
  //   </Box>
  // )

  return (
    <BoardingDetails />
  )
}

export default Rizni


