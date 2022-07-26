import {  getUsers } from '../services/user'
import { authActions } from '../Store/authSlice'
import { messageActions } from '../Store/messageSlice'
import { store } from '../Store/store'

export const updateAuth = async () => {
    if (store.getState().auth.status) {
        const userData = await getUsers(`where=id-${store.getState().auth.userID}`)
        if (userData.status !== 200) store.dispatch(messageActions.show(["Unable to update the system", "error"]))
        const user = userData?.data?.users[0]
        store.dispatch(authActions.set({...store.getState().auth, role: user.role.name}))
    }
}
