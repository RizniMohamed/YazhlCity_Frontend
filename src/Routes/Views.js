import { Route, Routes } from "react-router-dom"
import Rizni from '../Pages/Test/Rizni';
import Mathushiya from '../Pages/Test/Mathushiya';
import Sarujan from '../Pages/Test/Sarujan';

import NotFound from "../Pages/NotFound";

import Welcome from "../Pages/Welcome"
import BoardingDetails from "../Pages/BoardingDetails"
import Boardings from "../Pages/Boardings"
import RoomDetails from "../Pages/RoomDetails"
import Rooms from "../Pages/Rooms"

import AdminIndex from "../Pages/Admin/Index"
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

function Views() {
  return (
    <Routes>

      <Route index element={<Welcome />} />
      <Route path="Boardings" element={<Boardings />} />
      <Route path="Boardings/Details" element={<BoardingDetails />} />
      <Route path="Boardings/Details/Rooms" element={<Rooms />} />
      <Route path="Boardings/Details/Rooms/Details" element={<RoomDetails />} />

      <Route path="Admin" element={<AdminIndex/>}>
        <Route index element={< AdminDashbaord />} />
        <Route path="Boardings">
          <Route index element={< AdminBoardings />} />
          <Route path="Management" element={< AdminBoardingManagement />} />
          <Route path="Management/Rooms" element={< AdminRooms />} />
          <Route path="Management/Rooms/Management" element={< AdminRoomManagement />} />
        </Route>
        <Route path="Persons" element={< AdminPersons />} />
        <Route path="Notification" element={< AdminNotifications />} />
        <Route path="Verfication" element={< AdminVerify />} />
      </Route>

      <Route path="Manager">
        <Route index element={< ManagerDashboard />} />
        <Route path="Boardings">
          <Route index element={<ManagerBoardingManagement />} />
          <Route path="Rooms" element={< ManagerRooms />} />
          <Route path="Rooms/Management" element={< ManagerRoomManagement />} />
        </Route>
        <Route path="Persons" element={<ManagerPersons />} />
        <Route path="Notification" element={<ManagerNotification />} />
      </Route>

      <Route path = "Profile">
        <Route index element = {<MyProfile/>} />
        <Route path = "MyBoarding" element = {<MyBoarding/>} />
        <Route path = "MyPayment" element = {<MyPayment/>} />  
      </Route>

      <Route path="*" element={<NotFound />} />

      <Route path="test">
        <Route path="Rizni/*" element={<Rizni />} />
        <Route path="Mathushiya" element={<Mathushiya />} />
        <Route path="Sarujan" element={<Sarujan />} />
      </Route>

    </Routes>
  )
}

export default Views