import { Button } from '@mui/material';
import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { STRIPE_KEY } from '../LocalData/Keys'

const StripePayment = ({onClick, amount, btnName, }) => {
  return (
      <StripeCheckout
          token={onClick}
          amount={amount * 100}
          shippingAddress
          currency="LKR"
          stripeKey={STRIPE_KEY}>
          <Button
              variant='contained'
              size="small"
              sx={{ width: 150, ...buttonStyle, mr: 2 }}>
              {btnName}
          </Button>
      </StripeCheckout>
  )
}

export default StripePayment

const buttonStyle = {
    bgcolor: "background.mainbg",
    color: "white",
    "&:hover": {
        bgcolor: "primary.main",
    }
}