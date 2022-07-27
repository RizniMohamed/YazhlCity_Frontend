import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import { dialogActions } from '../../Store/dialogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPayments } from '../../services/Payment';
import { messageActions } from '../../Store/messageSlice';
import { useState } from 'react';
import { getRooms } from '../../services/Room';
import { getBoardings } from '../../services/Boardings';
import { getUsers } from '../../services/user';

const receipt = {
  status: false,
  customerID: 1,
  customerName: "Rizni",
  boardingName: "RC",
  roomID: 2,
  period: "Jan",
  invoiceType: "Credit",
  invoiceID: 123,
  amount: 4500
}


const MyPayment = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [payments, setPayments] = useState()

  useEffect(() => {
    (async () => {
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
          price: payment.amount + ".00 LKR",
          paymentStatus: payment.status? "Paid" : "Unpaid",
          boardingName: boarding.name,
          roomNumber: room.room_number,
        })
      })
      setPayments(temp_payments)

    })()
  }, [])


  const showRecipt = (e, { row }) => {
    // eslint-disable-next-line
    dispatch(dialogActions.show(['paymentDetails', , receipt]))
  }

  const onPayment = (data) => { }

  if (auth.role === "user") return (
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
        return (
          <Button
            disabled={row.paymentStatus ? true : false}
            variant="contained"
            color="secondary"
            size='small'
            sx={{ "&:hover": { bgcolor: "secondary.light" } }}
            onClick={() => dispatch(dialogActions.show(['payment', onPayment]))}>
            Pay Now
          </Button>
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
            disabled={row.paymentStatus ? false : true}
            size='small'
            sx={{ "&:hover": { bgcolor: "secondary.light" } }}
            onClick={(event) => showRecipt(event, row)}>
            Recepit
          </Button>
        );
      }
    },
  ];


  return (
    <>
      <Box mx="auto"  >
        <Typography fontWeight={700} fontSize={32} textAlign="center" sx={{ my: 5 }}>Hosteller Payment</Typography>
        <DataGrid
          sx={dataGrid_style}
          rows={payments}
          columns={columns}
          autoHeight
        />
      </Box>
    </>
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
  ".MuiDataGrid-root .MuiDataGrid-cell:focus-within": { outline: "none!important" },
  bgcolor: "#e3e1e1",
  borderColor: 'secondary.main',
  ".MuiDataGrid-row": {
    border: '1px solid #b4b4b4',
  },

}