import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import dialogSlice from "./Dialogs/dialogSlice";
import drawerSlice from "./drawerSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        dialog: dialogSlice.reducer,
        drawer: drawerSlice.reducer,
    }
})

