import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import posts from './posts';

const store = configureStore({
    reducer: {
        auth,
        posts
    },
});

export default store;