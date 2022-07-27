import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardingDetailsComp from '../../../Components/BoardingDetails';
import { getBoardings } from '../../../services/Boardings';
import { getRooms } from '../../../services/Room';
import { getUsers } from '../../../services/user';
import { messageActions } from '../../../Store/messageSlice';

const Boarding = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [boarding, SetBoarding] = useState(undefined)

    useEffect(() => {
        (async () => {
            const users = await getUsers(`where=id-${auth.userID}`)
            if (users.status !== 200) {
                dispatch(messageActions.show([users.data, "error"]))
                return
            }
            const user = users.data.users[0]

            const rooms = await getRooms(`where=id-${user.roomID}`)
            if (rooms.status !== 200) {
                dispatch(messageActions.show([rooms.data, "error"]))
                return
            }
            const room = rooms.data.rooms[0]

            const boardings = await getBoardings(`where=id-${room.boardingID}`)
            if (boardings.status !== 200) {
                dispatch(messageActions.show([boardings.data, "error"]))
                return
            }
            const boarding = boardings.data.boardings[0]

            const details = {
                id: boarding.id,
                name: boarding.name,
                rating: boarding.rating,
                verified: boarding.verified,
                mobile: boarding.mobile,
                geoloc: boarding.geoloc,
                rows: [
                    { name: 'Ownername', details: boarding.User.name },
                    { name: 'Address', details: boarding.address },
                    { name: 'Washrooms', details: boarding.Washroom.count },
                    { name: 'Bathrooms', details: boarding.Bathroom.count },
                    { name: 'Rooms', details: rooms.data.count ?? "Not published yet" },
                    { name: 'Description', details: `${boarding.description}. ${boarding.Bathroom.description}. ${boarding.Washroom.description}` },
                ],
                images: [...boarding.Boarding_images, { image: boarding.Bathroom.image }, { image: boarding.Washroom.image }]
            }
            SetBoarding(details)
        })()
    })

    if (!boarding)
        return (
            <Box display="flex" alignItems="center" justifyContent="center" height={"90vh"}>
                <Typography variant="h5" fontWeight={900}>Loading...</Typography>
            </Box>
        )

    return (
        <Box display="flex" flexDirection="column" m="auto" p={2}>
            {boarding && <BoardingDetailsComp data={boarding} />}
        </Box>
    )
}

export default Boarding