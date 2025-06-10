import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDiscount } from "../../../types/IDiscount";

interface DiscountState {
  discounts: IDiscount[];
  isLoading: boolean;
  message: string | null;
}

const initialState: DiscountState = {
  discounts: [],
  isLoading: false,
  message: null
};

export const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    onCheckDiscounts: state => {
      state.isLoading = true;
    },
    onLoadDiscounts: (state, action: PayloadAction<IDiscount[]>) => {
      state.discounts = action.payload;
      state.isLoading = false;
      state.message = null;
    },
    onAddDiscount: (state, action: PayloadAction<IDiscount>) => {
      state.discounts.push(action.payload);
      state.isLoading = false;
      state.message = null;
    },
    onUpdateDiscount: (state, action: PayloadAction<IDiscount>) => {
      state.discounts = state.discounts.map(d =>
        d.discountId === action.payload.discountId ? action.payload : d
      );
      state.isLoading = false;
      state.message = null;
    },
    onDeleteDiscount: (state, action: PayloadAction<number>) => {
      state.discounts = state.discounts.filter(d => d.discountId !== action.payload);
      state.isLoading = false;
      state.message = null;
    },
    onSetDiscountMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    onClearDiscountMessage: state => {
      state.message = null;
    }
  }
});

export const {
  onCheckDiscounts,
  onLoadDiscounts,
  onAddDiscount,
  onUpdateDiscount,
  onDeleteDiscount,
  onSetDiscountMessage,
  onClearDiscountMessage
} = discountSlice.actions;

export default discountSlice.reducer;
