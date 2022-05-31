import React from 'react'
import { Routes, Route } from 'react-router-dom'
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

  const num = 0;
  return (
    <Routes>
      {roles.map(({ role, data }, index) =>

        <Route key={index} path={`${role}`} >
          {
            data.map(({ path }, index) => {
              const x = path.split("/")
              const name = x[x.length -1]
              if (index == 0)
                return <Route key={index} index element={<SidePanel />} />
              else
                return <Route key={index} path={name} element={<SidePanel />} />
            })
          }
        </Route>

      )}
    </Routes>

  )
}

export default Rizni