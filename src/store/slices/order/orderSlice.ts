import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../../../types/IOrder";

interface OrderState {
  orders: IOrder[];
  isLoading: boolean;
  message: string | null;
}

const initialState: OrderState = {
  orders: [],
  isLoading: false,
  message: null
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    onCheckOrders: state => {
      state.isLoading = true;
    },
    onLoadOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.orders = action.payload;
      state.isLoading = false;
      state.message = null;
    },
    onAddOrder: (state, action: PayloadAction<IOrder>) => {
      state.orders.push(action.payload);
      state.isLoading = false;
    },
    onUpdateOrder: (state, action: PayloadAction<IOrder>) => {
      state.orders = state.orders.map(order =>
        order.orderId === action.payload.orderId ? action.payload : order
      );
      state.isLoading = false;
    },
    onSetOrderMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    onClearOrderMessage: state => {
      state.message = null;
    }
  }
});

export const {
  onCheckOrders,
  onLoadOrders,
  onAddOrder,
  onUpdateOrder,
  onSetOrderMessage,
  onClearOrderMessage
} = orderSlice.actions;

export default orderSlice.reducer;
