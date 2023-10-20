import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllOrdersList = createAsyncThunk('orders/getAllOrdersList', async () => {
    let resp;
    try {
        resp = await axios.get("/Data.json");
    } catch (err) {
        console.error('getAllOrdersList_Error:', err);
    }
    return resp?.data?.orders;
});