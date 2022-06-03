import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false
}
const deleteDialogSlice = createSlice({
    name : "Delete Dialog Slice",
    initialState,
    reducers : {
        show : state => {state.status = true},
        hide : state => {state.status = false},
    }
})

export const deleteDialogActions = deleteDialogSlice.actions
export default deleteDialogSlice