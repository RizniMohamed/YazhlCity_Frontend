import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false
}

const notifyDrawerSlice = createSlice({
    name : "Notify Drawer Slice",
    initialState,
    reducers : {
        show : state => { state.status = true},
        hide : state => { state.status = false}
    }
})

export const notifyDrawerActions = notifyDrawerSlice.actions
export default notifyDrawerSlice