import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    role : "guest",
    userID : -1,
    token : "",
    email : ""
}

const authSlice = createSlice({
    name : "Auth Slice",
    initialState,
    reducers : {
        set : (state, payload) => {
            state.status = payload.payload.status ?? true
            state.role = payload.payload?.role
            state.userID = payload.payload?.userID
            state.token = payload.payload?.token
            state.email = payload.payload?.email
        },
        reset: (state, payload) => {
            state.status = false
            state.role = "guest"
            state.userID = -1
            state.token = ""
            state.email = ""
        }
    }
})

export const authActions = authSlice.actions
export default authSlice