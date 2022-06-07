import {
  AttachMoney,
  Home,
  Logout,
  Person,
} from '@mui/icons-material';


const data = [
  {
    name: "Profile",
    path: "/profile/",
    icon: <Person />
  },
  {
    name: "My Boarding",
    path: "/profile/boarding",
    icon: <Home />
  },
  {
    name: "Payment",
    path: "/profile/payment",
    icon: <AttachMoney />
  },
  {
    name: "Logout",
    path: "/",
    icon: <Logout />
  },
]

export default data
