import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: JSON.parse(localStorage.getItem("user"))?.email || null,
    token: JSON.parse(localStorage.getItem("user"))?.token || null,
    id: JSON.parse(localStorage.getItem("user"))?.id || null,
    isModalAuth: false,
}

const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        removeUser(state) {
            state.email = null
            state.id = null
            state.token = null

            localStorage.removeItem("user")
        },
        setUser(state, action) {
            state.email = action.payload.email
            state.token = action.payload.token
            state.id = action.payload.id

            localStorage.setItem(
                "user",
                JSON.stringify({
                    email: action.payload.email,
                    token: action.payload.token,
                    id: action.payload.id,
                })
            )
        },

        setIsModalAuth(state, action) {
            state.isModalAuth = action.payload
        },
    },
})

export const { removeUser, setUser, setIsModalAuth } = userReducer.actions

export default userReducer
