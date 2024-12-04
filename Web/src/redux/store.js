import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import posts from './posts';
import user from './user';

const store = configureStore({
    reducer: {
        auth,
        posts,
        user
    },
});

export default store;