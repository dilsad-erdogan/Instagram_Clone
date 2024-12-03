import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
};

const posts = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        fetchPosts(state, action) {
            state.posts = action.payload;
            state.loading = false;
        },
    }
});

export const { fetchPosts } = posts.actions;
export default posts.reducer