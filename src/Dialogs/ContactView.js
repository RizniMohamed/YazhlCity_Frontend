import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../Store/dialogSlice';

const ContactView = () => {
    const { status, onSubmit, data } = useSelector(state => state.dialog.contactView)
    const dispatch = useDispatch()
    return (
        <Dialog open={status} onClose={() => { }}>
            <DialogTitle fontWeight={700} fontSize={22}> Contact </DialogTitle>
            <DialogContent>
                <DialogContentText color="text.main" fontSize={16}>{data}</DialogContentText>
            </DialogContent>
            <DialogActions >
                <Button
                    variant='contained'
                    size="small"
                    onClick={e => dispatch(dialogActions.hide("contactView"))}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ContactView