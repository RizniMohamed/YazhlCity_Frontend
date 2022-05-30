import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import deleteDialogSlice from "./Dialogs/deleteDialogSlice";

export const store = configureStore( {
    reducer : {
        auth : authSlice.reducer,
        deleteModel: deleteDialogSlice.reducer
        
    }
})

