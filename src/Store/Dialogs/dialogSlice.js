import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: {
        status: false,
        data: "",
        onSubmit: undefined
    },
    delete: {
        status: false,
        data: "",
        onSubmit: undefined
    },
    payment: {
        status: false,
        data: "",
        onSubmit: undefined
    },
    notificationDetails: {
        status: false,
        data: "",
        onSubmit: undefined
    },
    paymentDetails: {
        status: false,
        data: "",
        onSubmit: undefined
    },
    signup: {
        status: false,
        data: "",
        onSubmit: undefined
    },
}
const DialogSlice = createSlice({
    name: "Dialog Slice",
    initialState,
    reducers: {
        show: (state, payload) => {
            const [name, onSubmit, data] = payload?.payload
            state[name] = {
                status: true,
                data: data,
                onSubmit: onSubmit
            }
        },
        hide: (state, payload) => {
            state[payload?.payload] = {
                status: false,
                data: "",
                onSubmit: undefined
            }
        },
    }
})

export const dialogActions = DialogSlice.actions
export default DialogSlice