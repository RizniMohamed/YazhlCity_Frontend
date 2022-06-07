import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Divider, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../LocalData/Drawer/Logo';
import { drawerActions } from '../Store/drawerSlice';

const Header = () => {

  const drawerState = useSelector(state => state.drawer.status)
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
          {current === "admin" || current === "manager"  && <IconButton
            aria-label="open drawer"
            onClick={handleDrawerState}
            edge="start"
            sx={{
              color: "white",
            }}
          >
            <MenuIcon />
          </IconButton>}

          <Box mx={2} display="flex" alignItems="center">
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
              {auth.role !== "guest" && <Box >
                <Link to={`/${auth.role}`}><Typography>Console</Typography></Link>
                <Divider sx={current === "admin" || current === "manager" ? { bgcolor: "primary.main" } : { opacity: 0 }} />
              </Box>}
            </Box>
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
