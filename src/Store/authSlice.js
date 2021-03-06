import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : true,
    role : "admin",
    userID : -1,
}

const authSlice = createSlice({
    name : "Auth Slice",
    initialState,
    reducers : {
        set : (state, payload) => {
            state.status = payload.payload?.status
            state.role = payload.payload?.role
        }
    }
})

export const authActions = authSlice.actions
export default authSlice