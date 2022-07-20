import { Alert, Slide, Snackbar } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { messageActions } from '../Store/messageSlice'

const Message = () => {

    const {msg,status, variant} = useSelector(state => state.message)
    const dispatch = useDispatch()

    return (

        <Snackbar
            TransitionComponent={props => <Slide  {...props} direction="up" />}
            open={status}
            sx={{ minWidth: 300 }}
            autoHideDuration={2500}
            ClickAwayListenerProps={
                {
                    mouseEvent: false,
                    touchEvent: false
                }
            }
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={() => dispatch(messageActions.hide())} >
            <Alert variant='filled' severity={variant} sx={{ width: '100%'}}>
                {msg}
            </Alert>
        </Snackbar >
    )
}

export default Message