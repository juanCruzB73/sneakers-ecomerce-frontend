import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrderDetail } from "../../../types/IOrderDetail";

interface OrderDetailState {
  orderDetails: IOrderDetail[];
  isLoading: boolean;
  message: string | null;
}

const initialState: OrderDetailState = {
  orderDetails: [],
  isLoading: false,
  message: null
};

export const orderDetailSlice = createSlice({
  name: "orderDetail",
  initialState,
  reducers: {
    onCheckOrderDetails: state => {
      state.isLoading = true;
    },
    onLoadOrderDetails: (state, action: PayloadAction<IOrderDetail[]>) => {
      state.orderDetails = action.payload;
      state.isLoading = false;
    },
    onAddOrderDetail: (state, action: PayloadAction<IOrderDetail>) => {
      state.orderDetails.push(action.payload);
      state.isLoading = false;
    },
    onSetOrderDetailMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    onClearOrderDetailMessage: state => {
      state.message = null;
    }
  }
});

export const {
  onCheckOrderDetails,
  onLoadOrderDetails,
  onAddOrderDetail,
  onSetOrderDetailMessage,
  onClearOrderDetailMessage
} = orderDetailSlice.actions;

export default orderDetailSlice.reducer;
