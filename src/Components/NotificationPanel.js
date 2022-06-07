import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notifyDrawerActions } from '../Store/notifyDrawerSlice';

const NotificationPanel = () => {
  const state = useSelector(state => state.notifyDrawer.status)
  const dispatch = useDispatch()

  return (

    <SwipeableDrawer
      anchor="right"
      open={state}
      onClose={() => dispatch(notifyDrawerActions.hide())}
      onOpen={() => { }}
    >
      <Box sx={{ width: 250 }}>
        <Toolbar />
        <List>
          {[].map((notification, index) => (
            <ListItem key={index}>
              <ListItemButton>

              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  );
}

export default NotificationPanel