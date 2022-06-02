import {
  AttachMoney,
  Home,
  Logout,
  Person,
} from '@mui/icons-material';


const data = [
  {
    name: "Profile",
    path: "/test/rizni/profile/",
    icon: <Person />
  },
  {
    name: "My Boarding",
    path: "/test/rizni/profile/boarding",
    icon: <Home />
  },
  {
    name: "Payment",
    path: "/test/rizni/profile/payment",
    icon: <AttachMoney />
  },
  {
    name: "Logout",
    path: "/",
    icon: <Logout />
  },
]

export default data
