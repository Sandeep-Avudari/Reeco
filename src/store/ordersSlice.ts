import { createSlice } from "@reduxjs/toolkit";
import { IOrdersModel } from "../Models/ordersModel";
import { getAllOrdersList } from "./integration";
import { ESTATUS } from "../pages/utilities";

const initialState: IOrdersModel = {
    orders: undefined,
    statusUpdateModelData: undefined,
    actionData: undefined
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setOrderById: (state, action) => {
            let index = (state.orders || [])?.findIndex(ite => ite.id === action.payload);
            if (index !== -1 && state.orders)
                state.orders[index] = { ...state.orders[index], status: ESTATUS.Approved };
        },
        resetOrdersReducer: (state, action) => {
            state = initialState
        },
        updateOrderItemStatus: (state, action) => {
            const { orderid, id, updatedStatus } = action.payload;
            let itemIndex = -1;
            let orderIndex = (state.orders || [])?.findIndex(item => item.orderId === orderid);
            if (orderIndex !== -1 && state.orders) {
                itemIndex = state.orders[orderIndex].items?.findIndex(item => item.id === id);
                if (itemIndex !== -1) {
                    state.orders[orderIndex].items[itemIndex] = { ...state.orders[orderIndex].items[itemIndex], status: updatedStatus }
                }
            }
            state.statusUpdateModelData = undefined
        },
        openUpdateStatusModel: (state, action) => {
            state.statusUpdateModelData = action.payload;
        },
        setActionData: (state, action) => {
            state.actionData = action.payload;
        },
        editOrderItem: (state, action) => {
            const { orderid, id, quantity, price, reason } = action.payload;
            let itemIndex = -1;
            let orderIndex = (state.orders || [])?.findIndex(item => item.orderId === orderid);
            if (orderIndex !== -1 && state.orders) {
                itemIndex = state.orders[orderIndex].items?.findIndex(item => item.id === id);
                if (itemIndex !== -1) {
                    let data = { ...(state.orders[orderIndex].items[itemIndex] || {}) };
                    state.orders[orderIndex].items[itemIndex] = { ...data, oldPrice: data.price !== price ? data.price : 0, oldQuantity: (+data.quantity) !== (+quantity) ? data.quantity : 0, price, quantity, reason }
                }
            }
            state.actionData = undefined
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrdersList.fulfilled, (state, action) => {
            state.orders = action.payload;
        })
    },
});

export const { editOrderItem, setActionData, openUpdateStatusModel, updateOrderItemStatus, setOrderById, resetOrdersReducer } = ordersSlice.actions;

export default ordersSlice.reducer;