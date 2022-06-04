import React from 'react'
import Delete from '../Dialogs/Delete'
import Login from '../Dialogs/Login'
import NotificationDetails from '../Dialogs/NotificationDetails'
import Payment from '../Dialogs/Payment/Payment'
import PaymentDetails from '../Dialogs/PaymentDetails'
import Signup from './Signup'
const Dialogs = () => {
  return (
    <>
      <Login />
      <Delete />
      <Payment />
      <NotificationDetails />
      <PaymentDetails />
      <Signup/>
    </>
  )
}

export default Dialogs