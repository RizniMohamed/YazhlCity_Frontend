import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import { dialogActions } from '../../Store/dialogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPayments, LKR_USD, makePayment } from '../../services/Payment';
import { messageActions } from '../../Store/messageSlice';
import { useState } from 'react';
import { getRooms } from '../../services/Room';
import { getBoardings } from '../../services/Boardings';
import { getUsers } from '../../services/user';
import StripePayment from '../../Components/StripePayment'

const MyPayment = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [payments, setPayments] = useState()
  const [currentRow, setCurrentRow] = useState(undefined)
  const [user, setUser] = useState({})


  const loadData = async () => {
    const payments = await getPayments(`where=userId-${auth.userID}`)
    if (payments.status !== 200) {
      dispatch(messageActions.show([payments.data, 'error']))
      return
    }

    const users = await getUsers(`where=id-${auth.userID}`)
    if (users.status !== 200) {
      dispatch(messageActions.show([users.data, "error"]))
      return
    }
    const user = users.data.users[0]

    setUser(user)
    if (!user.roomID) return

    const rooms = await getRooms(`where=id-${user.roomID}`)
    if (rooms.status !== 200) {
      dispatch(messageActions.show([rooms.data, "error"]))
      return
    }
    const room = rooms.data.rooms[0]

    const boardings = await getBoardings(`where=id-${room.boardingID}`)
    if (boardings.status !== 200) {
      dispatch(messageActions.show([boardings.data, "error"]))
      return
    }
    const boarding = boardings.data.boardings[0]

    const temp_payments = []
    payments.data.payments.forEach(payment => {
      temp_payments.push({
        id: payment.id,
        date: new Date(payment.createdAt).toLocaleDateString(),
        paidDate: new Date(payment.updatedAt).toLocaleDateString(),
        userName: user.name,
        price: payment.amount + ".00 LKR",
        paymentStatus: payment.status ? "Paid" : "Unpaid",
        boardingName: boarding.name,
        roomNumber: room.room_number,
        paymentType: payment.paymentTypeID === 1 ? "Card" : "Cash"
      })
    })
    setPayments(temp_payments)

  }
  useEffect(() => {
    loadData()
    // eslint-disable-next-line
  }, [])


  const showRecipt = (row) => {
    const receipt = {
      status: row.paymentStatus,
      customerID: auth.userID,
      customerName: row.userName,
      boardingName: row.boardingName,
      room_number: row.roomNumber,
      period: row.date,
      invoiceType: row.paymentType,
      invoiceID: row.id,
      amount: row.price,
      paidDate: row.paidDate

    }
    // eslint-disable-next-line
    dispatch(dialogActions.show(['paymentDetails', , receipt]))
  }


  const paymentOnClick = async (token) => {
    console.log(currentRow);
    if (!currentRow) return
    console.log(currentRow);
    const payment_USD = await LKR_USD(Number.parseFloat(currentRow.price.split(' ')[0]))
    const sendData = {
      paymentTypeID: 1,
      paymentID: currentRow.id,
      payment_USD: payment_USD,
      stripeToken: token
    }
    setCurrentRow(undefined)


    dispatch(messageActions.show(["Payment request has been sent, please wait for the response", 'info']))
    const subscribed_data = await makePayment(sendData)
    if (subscribed_data.status !== 200) {
      dispatch(messageActions.show([subscribed_data.data, 'error']))
      return
    }
    loadData()
    dispatch(messageActions.show(["Room subscription is succeed"]))
  }

  if (!user.roomID)
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height={"90vh"} width={"100vw"}>
        <Typography variant="h5" fontWeight={900}>You havent subscribed any boarding yet :(</Typography>
        <Link to="/Boardings">
          <Button variant='contained' sx={{ ...buttonStyle }}>Browse boardings</Button>
        </Link>
      </Box>
    )

  const columns = [

    { field: 'date', headerName: 'Date', minWidth: 150, headerAlign: 'center', flex: 1, align: 'center' },
    { field: 'price', headerName: 'Price LKR', minWidth: 150, headerAlign: 'center', flex: 1, align: 'center' },
    { field: 'paymentStatus', headerName: 'Payment Status', minWidth: 150, headerAlign: 'center', flex: 1, align: 'center' },
    { field: 'boardingName', headerName: 'Boarding Name', minWidth: 150, headerAlign: 'center', flex: 1, align: 'center' },
    { field: 'roomNumber', headerName: 'Room Number', minWidth: 150, headerAlign: 'center', flex: 1, align: 'center' },
    {
      field: "pay",
      headerName: 'Pay',
      headerAlign: 'center',
      flex: 1,
      minWidth: 150,
      align: 'center',
      renderCell: ({ row }) => {
        setCurrentRow(row)
        return (
          <StripePayment
            onClick={paymentOnClick}
            mount={Number.parseFloat(row.price.split(' ')[0])}
            btnName="Pay Now"
            disabled={row.paymentStatus === "Unpaid" ? false : true}
            sx={{ "&:hover": { bgcolor: "secondary.light" }, width: 73, mr: 0 }} />
        );
      }
    },
    {
      field: "receipt",
      headerName: 'Receipt',
      headerAlign: 'center',
      flex: 1,
      minWidth: 150,
      align: 'center',
      renderCell: ({ row }) => {
        return (
          <Button
            variant="contained"
            color="secondary"
            disabled={row.paymentStatus === "Unpaid" ? true : false}
            size='small'
            sx={{ "&:hover": { bgcolor: "secondary.light" } }}
            onClick={() => showRecipt(row)}>
            Recepit
          </Button>
        );
      }
    },
  ];


  if (payments)
    return (
      <Box mx="auto"  >
        <Typography fontWeight={700} fontSize={32} textAlign="center" sx={{ my: 5 }}>Hosteller Payment</Typography>
        <DataGrid
          sx={dataGrid_style}
          rows={payments}
          columns={columns}
          autoHeight
        />
      </Box>
    )
}

export default MyPayment

const buttonStyle = {
  bgcolor: "background.mainbg",
  mt: 2,
  borderRadius: 0.3,
  width: 200,
  color: "white",
  "&:hover": {
    bgcolor: "secondary.light",
  }
}

const dataGrid_style = {
  width: 1150,
  ".MuiDataGrid-root .MuiDataGrid-cell:focus-within": { outline: "none !important" },
  bgcolor: "#e3e1e1",
  borderColor: 'secondary.main',
  ".MuiDataGrid-row": {
    border: '1px solid #b4b4b4',
  },

}