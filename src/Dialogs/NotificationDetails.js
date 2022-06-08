import React from 'react';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import BRTable from '../Components/helper/BRTable';
import { dialogActions } from '../Store/dialogSlice';

const NotificationDetails = () => {
  const { status, data } = useSelector(state => state.dialog.notificationDetails)
  const dispatch = useDispatch()


  const details = {
    info: [
      {
        name: "From",
        details: data.from,
      },
      {
        name: "To",
        details: data.to,
      },
    ],
  }


  return (
    <Dialog open={status} onClose={() => { }} fullWidth sx={{ ".MuiDialog-paper" : {minHeight:270}}}>
      <Box display="flex" justifyContent="space-between" >
        <DialogTitle fontWeight={700} fontSize={22} sx={{ pb: 0 }}> {data.subject} </DialogTitle>
        <Typography component="p" color="text.main" fontSize={13} pr={1}>{data.date}</Typography>
      </Box>
      <DialogContent sx={{ pt: 1 }}>
        <BRTable rows={details.info} firstColWidth={30} desc={false} />
        <Divider sx={{ my: 2, bgcolor: "background.mainbg" }} />
        <Typography component="p" align="justify" color="text.main" fontSize={16} my={1}>
          {data.message}
        </Typography>
      </DialogContent>
      <DialogActions >
        <Button
          variant='contained'
          size="small"
          onClick={() => dispatch(dialogActions.hide("notificationDetails"))}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NotificationDetails