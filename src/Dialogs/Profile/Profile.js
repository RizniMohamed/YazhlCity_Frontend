import React from 'react';
import { Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../../Store/dialogSlice';
import AuthForm from './AuthForm';

import ProfileForm from './ProfileForm';

const Profile = () => {
    const { status } = useSelector(state => state.dialog.profile)
    const dispatch = useDispatch()

    return (
        <Dialog open={status} onClose={() => { dispatch(dialogActions.hide("profile")) }} >

            <DialogTitle fontWeight={700} fontSize={34} textAlign="center">Profile</DialogTitle>

            <DialogContent sx={style_dialogContent}>
                <ProfileForm status={status} />
                <Divider variant="fullWidth" flexItem={true} sx={{ bgcolor: "border", my: 2 }} />
                <AuthForm />
            </DialogContent>

        </Dialog >
    )
}

export default Profile


const style_dialogContent = {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    pt: 1,
    px: 10,
    width: 450,
    '&::-webkit-scrollbar': {
        width: 0,
    },
}