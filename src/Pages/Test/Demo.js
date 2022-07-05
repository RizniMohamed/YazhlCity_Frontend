import React, { useState } from 'react'
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch } from 'react-redux'
import { dialogActions } from '../../Store/dialogSlice'
import Breadcrumbs from '../../Components/BreadCrumbs'
import BoardingCard from '../../Components/BoardingCard'
import RoomCard from '../../Components/RoomCard'
import BoardingDetails from '../../Components/BoardingDetails'
import RoomDetails from '../../Components/RoomDetails'
import Chips from '../../Components/Chips'
import SearchFilter from '../../Components/SearchFilter/SearchFilter'

const boardingCard = {
  id: 12,
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-rKKyNJtcuwuG61KFJKfmLgb0lG8OjNzFzg&usqp=CAU",
  name: "Boarding Name",
  availablity: "Available",
  rating: 3,
  location: 'Puttalam',
  address: "No 59, 6th lane spill road"
}

const roomCard = {
  id: 404,
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTu0VIKsqE9tOuNIcZ5WhKczC24bPbs2vx4g&usqp=CAU",
  roomNo: 486,
  availablity: "Unvailable",
  price: 4500,
  type: "Share",
  persons: 2
}

const boardingData = {
  name: "RC House",
  rating: 4,
  verified: true,
  rows: [
    {
      name: 'Ownername',
      details: 'Sarujan'
    },
    {
      name: 'Address',
      details: 'No.14,Jaffna mainroad,Jaffna'
    },
    {
      name: 'Room types',
      details: 'Single/Share'
    },
    {
      name: 'Washrooms',
      details: '2'
    },
    {
      name: 'Bathrooms',
      details: '3'
    },
    {
      name: 'Rooms',
      details: '5'
    },
    {
      name: 'Description',
      details: 'A great rental listing includes an informative title and stellar description that properly describes your rental property. While it’s easy to assume that tenants care more about the rental price, the photos, and location of an apartment, they also pay attention to the description. The rental listing description should complement the photos and other features of your listing while demonstrating you’re a sophisticated landlord.'
    },
  ],
  images: [
    {
      name: "Random Name #1",
      path: "https://cdn.pixabayasd.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
    },
    {
      name: "Random Name #1",
      path: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
    },
    {
      name: "Random Name #1",
      path: "https://static.remove.bg/remove-bg-web/6ad52d54336ad62d58e7bd1317d40fb98e377ad5/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg"
    },
    {
      name: "Random Name #1",
      path: "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
    },
  ]
}

const roomData = {
  roomNo: 10,
  availability: "Unavailable",
  rows: [
    {
      name: 'Room types',
      details: 'Single/Share'
    },
    {
      name: 'Max Persons',
      details: '2'
    },
    {
      name: 'Available Persons',
      details: '3'
    },
    {
      name: 'Description',
      details: 'A great rental listing includes an informative title and stellar description that properly describes your rental property. While it’s easy to assume that tenants care more about the rental price, the photos, and location of an apartment, they also pay attention to the description. The rental listing description should complement the photos and other features of your listing while demonstrating you’re a sophisticated landlord.'
    },
  ],
  images: [
    {
      name: "Random Name #1",
      path: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
    },
    {
      name: "Random Name #1",
      path: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
    },
    {
      name: "Random Name #1",
      path: "https://static.remove.bg/remove-bg-web/6ad52d54336ad62d58e7bd1317d40fb98e377ad5/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg"
    },
    {
      name: "Random Name #1",
      path: "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
    },
  ]
}

const chipData = [
  {
    name: "Option 1",
    value: false
  },
  {
    name: "Option 2",
    value: true
  },
  {
    name: "Option 3",
    value: true
  },
  {
    name: "Option 4",
    value: false
  },
]


const boardingList = [
  { title: 'The Shawshank Redemption', verified: true, available: false, year: 1994 },
  { title: 'The Godfather', verified: true, available: true, year: 1972 },
  { title: 'The Godfather: Part II', verified: false, available: false, year: 1974 },
  { title: 'The Dark Knight', verified: false, available: true, year: 2008 },
  { title: '12 Angry Men', verified: true, available: false, year: 1957 },
  { title: "Schindler's List", verified: true, available: true, year: 1993 },
  { title: 'Pulp Fiction', verified: false, available: false, year: 1994 },
];

const opts = [
  {
    name: "None",
    values: [
      {
        name: "None",
        value: ""
      }
    ]
  },
  {
    name: "Available",
    values: [
      {
        name: "None",
        value: ""
      },
      {
        name: "True",
        value: "true"
      },
    ]
  },
  {
    name: "Verified",
    values: [
      {
        name: "None",
        value: ""
      },
      {
        name: "True",
        value: "true"
      },
    ]
  },
]


const Demo = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState(chipData)
    const [dataFilter, setDataFilter] = useState(boardingList)


  const handleClick = ({ name }) => {
    const loginData = ['login']
    const deleteData = ['delete', () => { alert("IM DELETED") }, "Are you sure do you want to delete?"]
    const notificationDetails = ['notificationDetails', () => { alert("IM DELETED") }, { to: "Sarujan", from: "Rizni", message: "Notification message goes here" }]
    const paymentDetails = ['paymentDetails', () => { alert("IM DELETED") }, {
      customerID: 102,
      customerName: "Sarujan",
      boardingName: "SRM Boarding",
      roomID: 154,
      period: "Januvary",
      invoiceType: "Visa Card",
      invoiceID: 784,
      amount: "4500"
    }]
    const Signup = ['signup']
    const Payment = ['payment']


    switch (name) {
      case "Login": dispatch(dialogActions.show(loginData)); break;
      case "Delete": dispatch(dialogActions.show(deleteData)); break;
      case "NotificationDetails": dispatch(dialogActions.show(notificationDetails)); break;
      case "PaymentDetails": dispatch(dialogActions.show(paymentDetails)); break;
      case "Signup": dispatch(dialogActions.show(Signup)); break;
      case "Payment": dispatch(dialogActions.show(Payment)); break;
      default:
    }

  }

  return (
    <Box p={3} display="flex" >
      <Box p={3} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" color="initial" fontWeight={500}>Dialogs</Typography>
        {dataDialogs.map(({ name, value }, index) =>
          <Button
            key={index}
            variant='contained'
            sx={buttonStyle}
            onClick={(e) => handleClick(e.target)}
            name={value}>
            {name}
          </Button>
        )}
      </Box>
      <Box p={3} display="flex" flexDirection="column" bgcolor="lightgray" borderRadius={5}>

        <Typography variant="h5" color="initial" fontWeight={500}>Components</Typography>

        <Box display="flex">
          <Box m={2} bgcolor="white" p={2} borderRadius={5} display="flex" flexDirection="column" alignItems="center" minWidth={170}>
            <Typography fontSize={16} color="initial" fontWeight={500}>~ Bread Crumbs</Typography>
            <Breadcrumbs />
          </Box>

          <Box m={2} bgcolor="white" p={2} borderRadius={5} display="flex" flexDirection="column" alignItems="center" minWidth={170}>
            <Typography fontSize={16} color="initial" fontWeight={500}>~ Boarding Card</Typography>
            <BoardingCard {...boardingCard} />
          </Box>

          <Box m={2} bgcolor="white" p={2} borderRadius={5} display="flex" flexDirection="column" alignItems="center" minWidth={170}>
            <Typography fontSize={16} color="initial" fontWeight={500}>~ Room Card</Typography>
            <RoomCard {...roomCard} />
          </Box>

          <Box m={2} bgcolor="white" p={2} borderRadius={5} display="flex" flexDirection="column" alignItems="center" width={1100} minWidth={170}>
            <Typography fontSize={16} color="initial" fontWeight={500}>~ Boarding Details</Typography>
            <BoardingDetails data={boardingData} />
          </Box>

          <Box m={2} bgcolor="white" p={2} borderRadius={5} display="flex" flexDirection="column" alignItems="center" width={1100} minWidth={170}>
            <Typography fontSize={16} color="initial" fontWeight={500}>~ Room Details</Typography>
            <RoomDetails data={roomData} />
          </Box>

          <Box m={2} bgcolor="white" p={2} borderRadius={5} display="flex" flexDirection="column" alignItems="center" width={355} minWidth={170}>
            <Typography fontSize={16} color="initial" fontWeight={500}>~ Chipis</Typography>
            <Chips data={data} setData={setData} />
          </Box>

          <Box m={2} bgcolor="white" p={2} borderRadius={5} display="flex" flexDirection="column" alignItems="center" minWidth={170}>
            <Typography fontSize={16} color="initial" fontWeight={500}>~ Chipis</Typography>
            <SearchFilter list={boardingList} options={opts} setData={setDataFilter} />
          </Box>

        </Box>

      </Box>
    </Box>
  )
}

export default Demo


const dataDialogs = [
  {
    name: "Login",
    value: "Login"
  },
  {
    name: "Delete",
    value: "Delete"
  },
  {
    name: "Notification Details",
    value: "NotificationDetails"
  },
  {
    name: "Payment Details",
    value: "PaymentDetails"
  },
  {
    name: "Signup",
    value: "Signup"
  },
  {
    name: "Payment",
    value: "Payment"
  }
]


//style
const buttonStyle = {
  width: 170,
  m: 1,
  color: "white",
  bgcolor: "background.mainbg",
  ":hover": {
    bgcolor: "primary.main",
  }
}
