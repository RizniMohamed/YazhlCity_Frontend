import React, { useEffect, useState } from 'react';
import Logo from '../LocalData/Logo';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Divider, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { drawerActions } from '../Store/drawerSlice';
import { dialogActions } from '../Store/dialogSlice';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { notifyDrawerActions } from '../Store/notifyDrawerSlice';

const Header = () => {

  const drawerState = useSelector(state => state.leftDrawer.status)
  const notifyState = useSelector(state => state.notifyDrawer.status)
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [current, setCurrent] = useState("")

  const location = useLocation()

  useEffect(() => {
    const page = location.pathname.split("/").filter(x => x)[0]
    setCurrent(page)
  }, [location])

  const handleDrawerState = () => drawerState ? dispatch(drawerActions.hide()) : dispatch(drawerActions.show())

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "background.mainbg" }}>
        <Toolbar>
          {(current === "admin" || current === "manager" || current === "Manager" || current === "profile") && <IconButton
            onClick={handleDrawerState}
            edge="start"
            sx={{
              color: "white",
            }}>
            <MenuIcon />
          </IconButton>}

          <Box mx={2} display="flex" alignItems="center" flexGrow={1}>
            <Logo />
            <Box display="flex" width={300} mt={1} sx={styleMenu}>
              <Box >
                <Link to="/"><Typography>Home</Typography></Link>
                <Divider sx={current === undefined ? { bgcolor: "primary.main" } : { opacity: 0 }} />
              </Box>
              <Box >
                <Link to="/boardings"><Typography>Boarding</Typography></Link>
                <Divider sx={current === "boardings" ? { bgcolor: "primary.main" } : { opacity: 0 }} />
              </Box>
              {(auth.role === "manager" || auth.role === "admin") &&
                <Box >
                  <Link to={`/${auth.role}`}><Typography>Console</Typography></Link>
                  <Divider sx={current === "admin" || current === "manager" ? { bgcolor: "primary.main" } : { opacity: 0 }} />
                </Box>}
            </Box>
          </Box>

          <Box display="flex" alignItems="center" >
            {
              (auth.role === "manager" || auth.role === "admin" || auth.role === "hosteller") &&
              <NotificationsIcon onClick={() => notifyState ? dispatch(notifyDrawerActions.hide()) : dispatch(notifyDrawerActions.show())} sx={{ ...styleMenuRight, color: notifyState ? "primary.main" : "white" }} />
            }
            {
              auth.status ?
                <Link to="/profile"><AccountCircleIcon sx={{ ...styleMenuRight, color: current === "profile" ? "primary.main" : "white" }} /></Link> :
                <AccountCircleIcon onClick={() => dispatch(dialogActions.show(["login"]))} sx={{ ...styleMenuRight, color: current === "profile" ? "primary.main" : "white" }} />
            }
          </Box>

        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header

//style
const styleMenu = {
  ".MuiBox-root": {
    marginLeft: 5,
    ".MuiTypography-root": {
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 500,
      color: "white",
    },
    ".MuiDivider-root": {
      transition: "background 0.3s, color 0.3s",
      height: 3,
      borderRadius: 1,
      mt: 0.5
    }
  }
}

const styleMenuRight = {
  transition: "background 0.3s, color 0.3s",
  mx: 1.5,
  mt: 0.5,
  fontSize: 28,
  cursor: "pointer"
}