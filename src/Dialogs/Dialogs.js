import React from 'react'
import Delete from '../Dialogs/Delete'
import Login from '../Dialogs/Login'
import NotificationDetails from '../Dialogs/NotificationDetails'
import Payment from '../Dialogs/Payment/Payment'
import PaymentDetails from '../Dialogs/PaymentDetails'
import Signup from './Signup'
import NotificationPanel from '../Components/NotificationPanel'
import Profile from './Profile/Profile'
import ContactView from './ContactView'
import ProfileDetails from './ProfileDetails'
import NotificationCreate from './NotificationCreate'
import Message from './Message'

const Dialogs = () => {
  return (
    <>
      <Login />
      <Delete />
      <Payment />
      <NotificationDetails />
      <PaymentDetails />
      <Signup/>
      <NotificationPanel/>
      <Profile/>
      <ContactView/>
      <ProfileDetails/>
      <NotificationCreate/>
      <Message/>
    </>
  )
}

export default Dialogs