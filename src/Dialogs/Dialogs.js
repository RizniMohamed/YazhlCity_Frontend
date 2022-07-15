import React from 'react'
import Delete from '../Dialogs/Delete'
import Login from '../Dialogs/Login'
import NotificationDetails from '../Dialogs/NotificationDetails'
import Payment from '../Dialogs/Payment/Payment'
import PaymentDetails from '../Dialogs/PaymentDetails'
import Signup from './Signup'
import NotificationPanel from '../Components/NotificationPanel'
import ProfileForm from './ProfileForm'

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
      <ProfileForm/>
    </>
  )
}

export default Dialogs