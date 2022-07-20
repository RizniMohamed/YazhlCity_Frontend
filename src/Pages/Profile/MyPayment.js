import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Box, Button } from '@mui/material';
import { dialogActions } from '../../Store/dialogSlice';
import { useDispatch } from 'react-redux';
import { messageActions } from '../../Store/messageSlice';

const rows = [
  { id: 3, avatar: 'https://files.oyebesmartest.com/uploads/preview/-501567668725ri0kwvwyuz.jpg', name: 'Amal', month: "March", paymentStatus: false, boardingName: "RC", roomNumber: 12, receipt: 2 },
  { id: 2, avatar: 'https://files.oyebesmartest.com/uploads/preview/-501567668725ri0kwvwyuz.jpg', name: 'Amal', month: "Februavary", paymentStatus: true, boardingName: "RC", roomNumber: 12, receipt: 2 },
  { id: 1, avatar: 'https://files.oyebesmartest.com/uploads/preview/-501567668725ri0kwvwyuz.jpg', name: 'Amal', month: "Januvary", paymentStatus: true, boardingName: "RC", roomNumber: 12, receipt: 2 },
];

const MyPayment = () => {
  const dispatch = useDispatch()


  const showRecipt = (e, { row }) => {
    dispatch(dialogActions.show(['paymentDetails', , receipt]))
  }

  const onPayment = (data) => {

  }

  const receipt = {
    status : false,
    customerID: 1,
    customerName: "Rizni",
    boardingName: "RC",
    roomID: 2,
    period: "Jan",
    invoiceType: "Credit",
    invoiceID: 123,
    amount: 4500
  }


  const columns = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      renderCell: ({ row }) => <Avatar src={row.avatar} alt="profile image" />
      ,width: 150
    },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'month', headerName: 'Month', width: 150 },
    { field: 'paymentStatus', headerName: 'Payment Status', width: 150 },
    { field: 'boardingName', headerName: 'Boarding Name', width: 150 },
    { field: 'roomNumber', headerName: 'Room Number', width: 150 },
    {
      field: "pay",
      headerName: 'Pay',
      renderCell: ({row}) => {
        return (
          <Button
            disabled={row.paymentStatus? true : false}
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
      renderCell: ({row}) => {
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
      <Box mx="auto" my={10}>
        <DataGrid
          sx={{
            ".MuiDataGrid-root .MuiDataGrid-cell:focus-within": { outline: "none!important" },
            width: 1200,
            bgcolor: "#e3e1e1",
            borderColor: 'secondary.main',
            ".MuiDataGrid-row": {
              border: '1px solid #b4b4b4',
            }

          }}
          rows={rows}
          columns={columns}
          autoHeight
          initialState={{
            pagination: {
              pageSize: 10,
            },
          }}
        />
      </Box>
    </>
  )
}

export default MyPayment