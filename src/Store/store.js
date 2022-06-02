import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import deleteDialogSlice from "./Dialogs/deleteDialogSlice";
import drawerSlice from "./drawerSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        deleteModel: deleteDialogSlice.reducer,
        drawer: drawerSlice.reducer,
    }
})

