import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Box, Button } from '@mui/material';
import { dialogActions } from '../../Store/dialogSlice';
import { useDispatch } from 'react-redux';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const rows = [
  { id: 1, avatar: 'https://files.oyebesmartest.com/uploads/preview/-501567668725ri0kwvwyuz.jpg', name: 'World', messageTitle: "2", createdDate: 12, delete: 12 },
  { id: 2, avatar: 'https://files.oyebesmartest.com/uploads/preview/-501567668725ri0kwvwyuz.jpg', name: 'World', messageTitle: "2", createdDate: 12, delete: 12 },
  { id: 3, avatar: 'https://files.oyebesmartest.com/uploads/preview/-501567668725ri0kwvwyuz.jpg', name: 'World', messageTitle: "2", createdDate: 12, delete: 12 },
  { id: 4, avatar: 'https://files.oyebesmartest.com/uploads/preview/-501567668725ri0kwvwyuz.jpg', name: 'World', messageTitle: "2", createdDate: 12, delete: 12 },
];

const Notification = () => {
  const dispatch = useDispatch()

  const columns = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      renderCell: ({ row }) => <Avatar src={row.avatar} alt="profile image" />
      , width: 150
    },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'messageTitle', headerName: 'Message Title', width: 150 },
    { field: 'createdDate', headerName: 'Created Date', width: 150 },
    {
      field: 'delete',
      headerName: 'Delete',
      renderCell: ({ row }) => {
        return (
          <Button
            variant="contained"
            color="secondary"
            size='small'
            sx={{ "&:hover": { bgcolor: "secondary.light" } }}
            onClick={(event) => { dispatch(dialogActions.show(['delete', , "Are you sure do you want to delete this person?"])) }}>
            Delete
          </Button>
        )
      },
      width: 150
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


export default Notification