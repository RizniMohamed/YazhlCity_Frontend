import React, { useEffect, useState } from 'react';
import { Button, Grow, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../Store/dialogSlice';
import { notifyDrawerActions } from '../Store/notifyDrawerSlice';
import Notification from './Notification.js'
import { TransitionGroup } from 'react-transition-group';

const notifydata = [
  {
    id: 1,
    status: true,
    subject: "Are you finshed your tasks?",
    from: "Rizni Mohamed",
    to: "Sarujan Sivanantharaja",
    date: "2022.05.16 11:36 PM",
    message: "We have to finish our frontend works before June 15",
  },
  {
    id: 2,
    status: false,
    subject: "Are you finshed your tasks?",
    from: "Rizni Mohamed",
    to: "Sarujan Sivanantharaja",
    date: "2022.05.16 11:36 PM",
    message: "We have to finish our frontend works before June 15",
  },
  {
    id: 3,
    status: true,
    subject: "Are you finshed your tasks?",
    from: "Rizni Mohamed",
    to: "Sarujan Sivanantharaja",
    date: "2022.05.16 11:36 PM",
    message: "We have to finish our frontend works before June 15",
  },
  {
    id: 4,
    status: true,
    subject: "Are you finshed your tasks?",
    from: "Rizni Mohamed",
    to: "Sarujan Sivanantharaja",
    date: "2022.05.16 11:36 PM",
    message: "We have to finish our frontend works before June 15",
  },
  {
    id: 5,
    status: true,
    subject: "Are you finshed your tasks?",
    from: "Rizni Mohamed",
    to: "Sarujan Sivanantharaja",
    date: "2022.05.16 11:36 PM",
    message: "We have to finish our frontend works before June 15",
  },
  {
    id: 6,
    status: true,
    subject: "Are you finshed your tasks?",
    from: "Rizni Mohamed",
    to: "Sarujan Sivanantharaja",
    date: "2022.05.16 11:36 PM",
    message: "We have to finish our frontend works before June 15",
  },
  {
    id: 7,
    status: true,
    subject: "Are you finshed your tasks?",
    from: "Rizni Mohamed",
    to: "Sarujan Sivanantharaja",
    date: "2022.05.16 11:36 PM",
    message: "We have to finish our frontend works before June 15",
  },
  {
    id: 8,
    status: true,
    subject: "Are you finshed your tasks?",
    from: "Rizni Mohamed",
    to: "Sarujan Sivanantharaja",
    date: "2022.05.16 11:36 PM",
    message: "We have to finish our frontend works before June 15",
  },
  {
    id: 9,
    status: true,
    subject: "Are you finshed your tasks?",
    from: "Rizni Mohamed",
    to: "Sarujan Sivanantharaja",
    date: "2022.05.16 11:36 PM",
    message: "We have to finish our frontend works before June 15",
  },
  {
    id: 10,
    status: true,
    subject: "Are you finshed your tasks?",
    from: "Rizni Mohamed",
    to: "Sarujan Sivanantharaja",
    date: "2022.05.16 11:36 PM",
    message: "We have to finish our frontend works before June 15",
  },
  {
    id: 11,
    status: false,
    subject: "Are you finshed your tasks?",
    from: "Rizni Mohamed",
    to: "Sarujan Sivanantharaja",
    date: "2022.05.16 11:36 PM",
    message: "We have to finish our frontend works before June 15",
  },
  {
    id: 12,
    status: true,
    subject: "Are you finshed your tasks?",
    from: "Rizni Mohamed",
    to: "Sarujan Sivanantharaja",
    date: "2022.05.16 11:36 PM",
    message: "We have to finish our frontend works before June 15",
  },

]

/*
  //TODO  Notification order
          order the notification according to created date
  
  //TODO  Date display function
          Create function for convert the JS date into UI display date
*/

const NotificationPanel = () => {
  const state = useSelector(state => state.notifyDrawer.status)
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  useEffect(() => {
    setData(notifydata)
  }, [state])

  const handleOnClick = (id) => {
    const [notifiy] = data.filter(n => n.id === id)
    notifiy.status = true
    dispatch(dialogActions.show(["notificationDetails", null, notifiy]))
    setData([...data, notifiy])
  }


  return (

    <SwipeableDrawer
      anchor="right"
      open={state}
      onClose={() => dispatch(notifyDrawerActions.hide())}
      onOpen={() => { }}
    >
      <Box sx={{ width: 350 }}>
        <Toolbar />
        <List >
          <Box maxHeight={580} overflow="auto">
            <TransitionGroup>

              {data.sort((a, b) => a.status - b.status).map((notification) => (
                <Grow direction="left" timeout={{ 'enter': 500, 'exit': 200 }} key={notification.id}>
                  <ListItem>
                    <ListItemButton
                      onClick={() => handleOnClick(notification.id)}
                      sx={{
                        p: 0,
                        m: 0,
                        borderRadius: 0.5,
                        bgcolor: notification.status ? "background.secondarybg" : "primary.main",
                        ":hover": { bgcolor: "secondary.light" },
                        height: 80,
                      }}>
                      <Notification {...notification} />
                    </ListItemButton>
                  </ListItem>
                </Grow>
              ))}
            </TransitionGroup>

          </Box>
          <Box display="flex" justifyContent="center" position="fixed" bottom={15} right={145} >
            <Button
              sx={{
                color: "white",
                fontSize: 16,
                fontWeight: 500,
                borderRadius: 0.3,
                p: 0,
                ":hover": { bgcolor: "background.mainbg" }
              }}
              onClick={() => setData([])}
            >Clear</Button>
          </Box>
        </List>
      </Box>
    </SwipeableDrawer>
  );
}

export default NotificationPanel