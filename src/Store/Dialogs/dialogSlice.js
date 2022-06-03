import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false
}
const DialogSlice = createSlice({
    name : " Dialog Slice",
    initialState,
    reducers : {
        show : state => {state.status = true},
        hide : state => {state.status = false},
    }
})

export const dialogActions = DialogSlice.actions
export default DialogSlice