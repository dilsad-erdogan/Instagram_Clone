import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    searchResults: [],
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers(state, action) {
            state.users = action.payload;
        },
        searchUsers(state, action) {
            const searchTerm = action.payload.toLowerCase();
            state.searchResults = state.users.filter((user) =>
                user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm)
            );
        },
    },
});

export const { setUsers, searchUsers } = usersSlice.actions;
export default usersSlice.reducer;