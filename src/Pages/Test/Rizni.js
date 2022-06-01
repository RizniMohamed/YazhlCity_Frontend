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



  const data = {
    rows: [
      {
        name: 'Ownername',
        details: 'Sarujan'
      },
      {
        name: 'Address',
        details: 'No.14,Jaffna mainroad,Jaffna'
      },
      {
        name: 'Room types',
        details: 'Single/Share'
      },
      {
        name: 'Washrooms',
        details: '2'
      },
      {
        name: 'Bathrooms',
        details: '3'
      },
      {
        name: 'Rooms',
        details: '5'
      },
      {
        name: 'Description',
        details: 'A great rental listing includes an informative title and stellar description that properly describes your rental property. While it’s easy to assume that tenants care more about the rental price, the photos, and location of an apartment, they also pay attention to the description. The rental listing description should complement the photos and other features of your listing while demonstrating you’re a sophisticated landlord.'
      },
    ],
    images: [
      {
        name: "Random Name #1",
        path: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
      },
      {
        name: "Random Name #1",
        path: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
      },
      {
        name: "Random Name #1",
        path: "https://static.remove.bg/remove-bg-web/6ad52d54336ad62d58e7bd1317d40fb98e377ad5/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg"
      },
      {
        name: "Random Name #1",
        path: "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
      },
    ]
  }



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
    <Box p={3}>
      <BoardingDetails data ={data} />
    </Box>
  )
}

export default Rizni


