import { Route, Routes } from "react-router-dom"

import NotFound from "../Pages/NotFound";

import Welcome from "../Pages/Welcome"
import Boarding from "../Pages/Boardings"
import BoardingDetails from "../Pages/BoardingDetails"
import Rooms from "../Pages/Rooms"
import RoomDetails from "../Pages/RoomDetails"

import AdminIndex from "../Pages/Admin/Index"
import AdminDashbaord from "../Pages/Admin/Dashboard"
import AdminBoardings from "../Pages/Admin/Boardings"
import AdminBoardingManagement from "../Pages/Admin/BoardingManagement"
import AdminRooms from "../Pages/Admin/Rooms"
import AdminRoomManagement from "../Pages/Admin/RoomManagement"
import AdminPersons from "../Pages/Admin/Persons"
import AdminNotifications from "../Pages/Admin/Notification"
import AdminVerify from "../Pages/Admin/BoardingVerify"

import ManagerIndex from "../Pages/Manager/Index"
import ManagerDashboard from "../Pages/Manager/Dashbaord"
import ManagerBoardingManagement from "../Pages/Manager/BoardingManagement"
import ManagerRooms from "../Pages/Manager/Rooms"
import ManagerRoomManagement from "../Pages/Manager/RoomManagement"
import ManagerPersons from "../Pages/Manager/Persons"
import ManagerNotification from "../Pages/Manager/Notification"

import ProfileIndex from "../Pages/Profile/Index"
import MyBoarding from "../Pages/Profile/MyBoarding"
import MyPayment from "../Pages/Profile/MyPayment"
import MyProfile from "../Pages/Profile/MyProfile"

function Views() {
  return (
    <Routes>

      <Route index element={<Welcome />} />

      <Route path="Admin" element={<AdminIndex />}>
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

      <Route path="Manager" element={<ManagerIndex />}>
        <Route index element={< ManagerDashboard />} />
        <Route path="Boarding" element={<ManagerBoardingManagement />} />
        <Route path="Rooms">
          <Route index element={< ManagerRooms />} />
          <Route path=":roomID" element={< ManagerRoomManagement />} />
        </Route>
        <Route path="Persons" element={<ManagerPersons />} />
        <Route path="Notification" element={<ManagerNotification />} />
      </Route>

      <Route path="Profile" element={<ProfileIndex />}>
        <Route index element={<MyProfile />} />
        <Route path="Boarding" element={<MyBoarding />} />
        <Route path="Payment" element={<MyPayment />} />
      </Route>

      <Route path="Boardings" element={<Boarding/>}/>
      <Route path="Boardings/:boardingID" element={<BoardingDetails/>}/>
      <Route path="Boardings/:boardingID/Rooms" element={<Rooms/>}/>
      <Route path="Boardings/:boardingID/Rooms/:roomID" element={<RoomDetails/>}/>

      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}

export default Views