import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom"

import NotFound from "../Pages/NotFound";

import Welcome from "../Pages/Welcome"
import Boarding from "../Pages/Boardings"
import BoardingDetails from "../Pages/BoardingDetails"
import Rooms from "../Pages/Rooms"
import RoomDetails from "../Pages/RoomDetails"

import AdminDashbaord from "../Pages/Admin/Dashboard"
import AdminBoardings from "../Pages/Admin/Boardings"
import AdminBoardingManagement from "../Pages/Admin/BoardingManagement"
import AdminRooms from "../Pages/Admin/Rooms"
import AdminRoomManagement from "../Pages/Admin/RoomManagement"
import AdminPersons from "../Pages/Admin/Persons"
import AdminNotifications from "../Pages/Admin/Notification"
import AdminVerify from "../Pages/Admin/BoardingVerify"

import ManagerDashboard from "../Pages/Manager/Dashbaord"
import ManagerBoardingManagement from "../Pages/Manager/BoardingManagement"
import ManagerRooms from "../Pages/Manager/Rooms"
import ManagerRoomManagement from "../Pages/Manager/RoomManagement"
import ManagerPersons from "../Pages/Manager/Persons"
import ManagerNotification from "../Pages/Manager/Notification"

import MyBoarding from "../Pages/Profile/MyBoarding"
import MyPayment from "../Pages/Profile/MyPayment"
import MyProfile from "../Pages/Profile/MyProfile"
import { store } from "../Store/store";
import { Box } from "@mui/material";
import SidePanel from "../Components/SidePanel";


const ProtectedRoute = ({ roles = [], children, }) => {
  const auth = store.getState().auth
  const location = useLocation()
  const path = location.pathname.split('/').filter(x => x)

  if (!roles.includes(auth.role)) {
    if (location.pathname.split('/').filter(x => x).length === 1)
      return <Navigate to={'/'} replace />;
    path.pop()
    return <Navigate to={`/${path.join('/')}`} replace />;
  }

  return children ? children : (
    <Box display="flex" p={1} >
      <SidePanel />
      <Outlet />
    </Box>
  )
};


function Views() {
  return (
    <Routes>

      <Route index element={<Welcome />} />


      <Route path="Admin" element={<ProtectedRoute roles={['admin']} />} >
        <Route index element={< AdminDashbaord />} />
        <Route path="Boardings">
          <Route index element={< AdminBoardings />} />
          <Route path=":boardingID" element={< AdminBoardingManagement />} />
          <Route path=":boardingID/Rooms" element={< AdminRooms />} />
          <Route path=":boardingID/Rooms/:roomID" element={< AdminRoomManagement />} />
        </Route>
        <Route path="Persons" element={< AdminPersons />} />
        <Route path="Notification" element={< AdminNotifications />} />
        <Route path="Verfication" element={< AdminVerify />} />
      </Route>

      <Route path="Manager" element={<ProtectedRoute roles={['manager']} />} >
        <Route index element={< ManagerDashboard />} />
        <Route path="Boarding" element={<ManagerBoardingManagement />} />
        <Route path="Rooms">
          <Route index element={< ManagerRooms />} />
          <Route path=":roomID" element={< ManagerRoomManagement />} />
        </Route>
        <Route path="Persons" element={<ManagerPersons />} />
        <Route path="Notification" element={<ManagerNotification />} />
      </Route>

      <Route path="Profile" element={<ProtectedRoute roles={['admin', 'manager', 'hosteller', 'user']} />} >
        <Route index element={<MyProfile />} />
        <Route path="Boarding" element={<MyBoarding />} />
        <Route path="Payment" element={<MyPayment />} />
      </Route>

      {/* Guest */}
      <Route path="Boardings" element={<Boarding />} />
      <Route path="Boardings/:boardingID" element={<BoardingDetails />} />
      <Route path="Boardings/:boardingID/Rooms" element={<Rooms />} />
      <Route path="Boardings/:boardingID/Rooms/:roomID" element={<RoomDetails />} />

      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}

export default Views