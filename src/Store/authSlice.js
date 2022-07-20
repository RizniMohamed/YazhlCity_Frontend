import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    role : "guest",
    userID : -1,
    token : ""
}

const authSlice = createSlice({
    name : "Auth Slice",
    initialState,
    reducers : {
        set : (state, payload) => {
            state.status = payload.payload?.status
            state.role = payload.payload?.role
            state.userID = payload.payload?.userID
            state.token = payload.payload?.token
        },
        reset: (state, payload) => {
            state.status = false
            state.role = "guest"
            state.userID = -1
            state.token = ""
        }
    }
})

export const authActions = authSlice.actions
export default authSlice