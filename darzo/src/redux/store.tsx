import { configureStore } from '@reduxjs/toolkit';
import authReducer from './user/authSclice';
import userReducer from './user/userSlice';
import messageReducer from './user/messageSlice';
import websocketReducer from './user/websocketSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        message: messageReducer,
        websocket: websocketReducer,
        //add other reducers
    },
});

export default store;