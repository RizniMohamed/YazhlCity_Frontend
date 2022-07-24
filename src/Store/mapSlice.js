import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    position : ""
}

const mapSlice = createSlice({
    name : "Map Slice",
    initialState,
    reducers : {
        set : (state, payload) => {
            state.position = payload.payload 
        },
        
    }
})

export const mapActions = mapSlice.actions
export default mapSlice