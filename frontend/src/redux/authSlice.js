import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: storedUser,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            if (action.payload) {
                localStorage.setItem("user", JSON.stringify(action.payload));
            } else {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        }
    }
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
