import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer'
import {
  Box,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  ListItemIcon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import ManagerData from "../LocalData/Drawer/ManagerDrawerData"
import AdminData from "../LocalData/Drawer/AdminDrawerData"
import ProfileData from "../LocalData/Drawer/ProfileDrawerData"
import { useDispatch, useSelector } from 'react-redux';
import { drawerActions } from '../Store/drawerSlice';

// custom drawer to animate open and close
const drawerWidth = 180;
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    ...(open && {
      ...theme.mixins.openedMixin(theme, drawerWidth),
      '& .MuiDrawer-paper': theme.mixins.openedMixin(theme, drawerWidth),
    }),
    ...(!open && {
      ...theme.mixins.closedMixin(theme),
      '& .MuiDrawer-paper': theme.mixins.closedMixin(theme),
    }),
  }),
);

export default function ClippedDrawer() {

  const [data, setData] = useState([]);
  const [current, setCurrent] = useState("");
  const location = useLocation()
  const dispatch = useDispatch()
  const drawerState = useSelector(state => state.drawer.status)

  useEffect(() => {
    const pathArrays = location.pathname.split("/").filter(x => x)

    let userRole, currentPage = ""

    if (pathArrays.length === 3)
      userRole = pathArrays[pathArrays.length - 1].toLowerCase()
    else {
      userRole = pathArrays[pathArrays.length - 2].toLowerCase()
      currentPage = pathArrays[pathArrays.length - 1].toLowerCase()
    }

    if (currentPage)
      setCurrent(currentPage)
    else
      setCurrent(userRole === "profile" ? "profile" : "dashbaord")

    switch (userRole) {
      case "admin": setData(AdminData); break;
      case "manager": setData(ManagerData); break;
      case "profile": setData(ProfileData); break;
      default: break;
    }


  }, [location])


  const handleDrawerState = () => {
    drawerState ? dispatch(drawerActions.hide()) : dispatch(drawerActions.show())
  }

  const hoverStyle = () => {
    let element = null

    if (drawerState)
      element = "MuiListItemButton"
    else
      element = "MuiSvgIcon"

    return {
      [`& .${element}-root:hover`]: {
        borderRadius: element === "MuiSvgIcon" ? 0.3 : 0.2,
        backgroundColor: "primary.main",
        px: 1,
        color: "white"
      },
    }
  }

  const selectedStyle = (name) => {
    if (name === "my boarding") name = "boarding"
    if (current === name) {
      if (drawerState)
        return {
          '& .MuiListItemButton-root': {
            borderRadius: 0.2,
            backgroundColor: "primary.main",
            px: 1,
            color: "white"
          },
          '& .MuiSvgIcon-root': {
            backgroundColor: "primary.main",
            px: 1,
            color: "white"
          },
        }
      else
        return {
          '& .MuiSvgIcon-root': {
            backgroundColor: "primary.main",
            px: 1,
            color: "white"
          },
        }
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>

      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "background.mainbg" }}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerState}
            edge="start"
            sx={{
              color: "white",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={drawerState}
        sx={hoverStyle()}
      >
        <Toolbar />
        <List>
          {data.map(({ name, path, icon }, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block', ...selectedStyle(name.toLowerCase()) }}>
              <Link to={path}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: drawerState ? 'initial' : 'center',
                    marginX: 1.5,
                    paddingX: 0
                  }} >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: drawerState ? 2 : 'auto',
                      justifyContent: 'center',
                    }} >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={name} sx={{ opacity: drawerState ? 1 : 0 }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
