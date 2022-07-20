import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Box, Button, Fab } from '@mui/material';
import { dialogActions } from '../../Store/dialogSlice';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { messageActions } from '../../Store/messageSlice';

const rows = [
  { id: 1, avatar: 'https://scontent.fcmb1-2.fna.fbcdn.net/v/t1.18169-9/29496037_562459784134736_422384098924186276_n.jpg?stp=cp0_dst-jpg_e15_fr_q65&_nc_cat=103&ccb=1-7&_nc_sid=85a577&efg=eyJpIjoidCJ9&_nc_eui2=AeH2I46EmqHZ4BRauHUHQitjM46J2_AT0oUzjonb8BPShdmnLH4KhdUUfxq_g88ZMx1e8mcZwM8bK6_QPY8MNjBk&_nc_ohc=t0uXL_Vm_pIAX_bY1pb&_nc_ht=scontent.fcmb1-2.fna&oh=00_AT8EmHWRLoVWfxWzALtwTIDjZhAwmK1KWdPjU79vsaIQFg&oe=62FB94EF', name: 'Rizni', messageTitle: "Payment pending", createdDate: "2022.07.16", delete: 12 },
  { id: 2, avatar: 'https://i.pinimg.com/564x/fe/fb/6b/fefb6b7857e863244bc1cea79d577124.jpg', name: 'Sharujan', messageTitle: "Water cut", createdDate: "2022.07.10", delete: 12 },
  { id: 3, avatar: 'https://p0.pxfuel.com/preview/621/868/1023/fashion-style-hair-t-shirt.jpg', name: 'Thujeevan', messageTitle: "Power cut", createdDate: "2022.06.15", delete: 12 },
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
      field: 'edit',
      headerName: 'Edit',
      renderCell: ({ row }) => {
        return (
          <Button
            variant="contained"
            color="secondary"
            size='small'
            sx={{ "&:hover": { bgcolor: "secondary.light" } }}
            onClick={(event) => { dispatch(dialogActions.show(['delete', , "Are you sure do you want to delete this person?"])) }}>
            Edit
          </Button>
        )
      },
      width: 150
    },
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
      <Fab size="small" color="secondary" sx={{ position:"fixed", bottom:20, right:16}}>
        <AddIcon />
      </Fab>
    </>
  )
}


export default Notification