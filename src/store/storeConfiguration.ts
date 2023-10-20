import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import ordersReducer from "./ordersSlice";

const rootReducer = combineReducers({
    ordersReducer,
});
const store = configureStore({
    reducer: rootReducer,
});

export default store;