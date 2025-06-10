import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IImg } from "../../../types/IImg";

interface ImgState {
  imgs: IImg[];
  isLoading: boolean;
  message: string | null;
}

const initialState: ImgState = {
  imgs: [],
  isLoading: false,
  message: null
};

export const imgSlice = createSlice({
  name: "img",
  initialState,
  reducers: {
    onCheckImgs: state => {
      state.isLoading = true;
    },
    onLoadImgs: (state, action: PayloadAction<IImg[]>) => {
      state.imgs = action.payload;
      state.isLoading = false;
      state.message = null;
    },
    onAddImg: (state, action: PayloadAction<IImg>) => {
      state.imgs.push(action.payload);
      state.isLoading = false;
      state.message = null;
    },
    onDeleteImg: (state, action: PayloadAction<number>) => {
      state.imgs = state.imgs.filter(img => img.imgId !== action.payload);
      state.isLoading = false;
      state.message = null;
    },
    onSetImgMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    onClearImgMessage: state => {
      state.message = null;
    }
  }
});

export const {
  onCheckImgs,
  onLoadImgs,
  onAddImg,
  onDeleteImg,
  onSetImgMessage,
  onClearImgMessage
} = imgSlice.actions;

export default imgSlice.reducer;
