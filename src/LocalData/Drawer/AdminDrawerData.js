import {
  Dashboard,
  Home,
  Person,
  Notifications,
  VerifiedUser
} from '@mui/icons-material';


const data = [
  {
    name: "Dashboard",
    path: "/admin/",
    icon: <Dashboard />
  },
  {
    name: "Boardings",
    path: "/admin/boardings",
    icon: <Home />
  },
  {
    name: "Persons",
    path: "/admin/persons",
    icon: <Person />
  },
  {
    name: "Notification",
    path: "/admin/notification",
    icon: <Notifications />
  },
  {
    name: "Verfication",
    path: "/admin/verfication",
    icon: <VerifiedUser />
  },
]

export default data