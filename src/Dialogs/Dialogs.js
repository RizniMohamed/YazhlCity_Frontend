import React from 'react'
import Delete from '../Dialogs/Delete'
import Login from '../Dialogs/Login'
import NotificationDetails from '../Dialogs/NotificationDetails'
import PaymentDetails from '../Dialogs/PaymentDetails'
import Signup from './Signup'
import NotificationPanel from '../Components/NotificationPanel'
import Profile from './Profile/Profile'
import ContactView from './ContactView'
import ProfileDetails from './ProfileDetails'
import NotificationCreate from './NotificationCreate'
import Message from './Message'
import OTP from './OTP'
import UpdatePassword from './UpdatePassword'
import BoardingForm from './BoardingForm'
import RoomForm from './RoomForm'

const Dialogs = () => {
  return (
    <>
      <Login />
      <Delete />
      <NotificationDetails />
      <PaymentDetails />
      <Signup />
      <NotificationPanel />
      <Profile />
      <ContactView />
      <ProfileDetails />
      <NotificationCreate />
      <Message />
      <OTP />
      <UpdatePassword />
      <BoardingForm/>
      <RoomForm/>
    </>
  )
}

export default Dialogs