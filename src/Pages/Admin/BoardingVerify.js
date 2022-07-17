import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Box, Button, Fab } from '@mui/material';
import { dialogActions } from '../../Store/dialogSlice';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import {Link} from "react-router-dom"

const rows = [
  { id: 1, avatar: 'https://files.oyebesmartest.com/uploads/preview/-501567668725ri0kwvwyuz.jpg', boardingName: 'World', ownerName: "2", viewDetails: 12, verify: 12, delete: 12 },
  { id: 2, avatar: 'https://files.oyebesmartest.com/uploads/preview/-501567668725ri0kwvwyuz.jpg', boardingName: 'World', ownerName: "2", viewDetails: 12, verify: 12, delete: 12 },
  { id: 3, avatar: 'https://files.oyebesmartest.com/uploads/preview/-501567668725ri0kwvwyuz.jpg', boardingName: 'World', ownerName: "2", viewDetails: 12, verify: 12, delete: 12 },
  { id: 4, avatar: 'https://files.oyebesmartest.com/uploads/preview/-501567668725ri0kwvwyuz.jpg', boardingName: 'World', ownerName: "2", viewDetails: 12, verify: 12, delete: 12 },
  { id: 5, avatar: 'https://files.oyebesmartest.com/uploads/preview/-501567668725ri0kwvwyuz.jpg', boardingName: 'World', ownerName: "2", viewDetails: 12, verify: 12, delete: 12 },
  { id: 6, avatar: 'https://files.oyebesmartest.com/uploads/preview/-501567668725ri0kwvwyuz.jpg', boardingName: 'World', ownerName: "2", viewDetails: 12, verify: 12, delete: 12 },
];

const BoardingVerify = () => {
  const dispatch = useDispatch()

  const columns = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      renderCell: ({ row }) => <Avatar src={row.avatar} alt="profile image" />
      , width: 150
    },
    { field: 'boardingName', headerName: 'Boarding Name', width: 150 },
    { field: 'ownerName', headerName: 'Owner Name', width: 150 },
    {
      field: 'viewDetails',
      headerName: 'View Details',
      renderCell: ({ row }) => {
        return (
          <Link to="/Boardings/:boardingID">
            <Button
              variant="contained"
              color="secondary"
              size='small'
              sx={{ "&:hover": { bgcolor: "secondary.light" } }}>
              View Details
            </Button>
          </Link>
        )
      },
      width: 150
    },
    {
      field: 'verify',
      headerName: 'Verify',
      renderCell: ({ row }) => {
        return (
          <Button
            variant="contained"
            color="secondary"
            size='small'
            sx={{ "&:hover": { bgcolor: "secondary.light" } }}
            onClick={(event) => { }}>
            Verify
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
            onClick={(event) => { dispatch(dialogActions.show(['delete', , "Are you sure do you want to delete this boarding?"])) }}>
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
      <Fab size="small" color="secondary" sx={{ position: "fixed", bottom: 20, right: 16 }}>
        <AddIcon />
      </Fab>
    </>
  )
}


export default BoardingVerify