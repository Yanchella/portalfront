import {configureStore} from '@reduxjs/toolkit';
import {userSlice} from "./slices/userSlice";
import {mastersSlice} from "./slices/mastersSlice";
import {servicesSlice} from "./slices/servicesSlice";
import {ordersSlice} from "./slices/ordersSlice";

export default configureStore({
    reducer: {
        user: userSlice.reducer,
        masters: mastersSlice.reducer,
        services: servicesSlice.reducer,
        orders: ordersSlice.reducer
    },
});