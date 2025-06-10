import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../types/IUser";

interface UserState {
  users: IUser[];
  isLoading: boolean;
  message: string | null;
  activeUser: IUser | null;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  message: null,
  activeUser: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onCheckUsers: state => {
      state.isLoading = true;
    },
    onLoadUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
      state.isLoading = false;
    },
    onAddUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);
      state.isLoading = false;
    },
    onUpdateUser: (state, action: PayloadAction<IUser>) => {
      state.users = state.users.map(user =>
        user.userId === action.payload.userId ? action.payload : user
      );
      state.isLoading = false;
    },
    onSelectActiveUser: (state, action: PayloadAction<IUser>) => {
      state.activeUser = action.payload;
    },
    onSetUserMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    onClearUserMessage: state => {
      state.message = null;
    }
  }
});

export const {
  onCheckUsers,
  onLoadUsers,
  onAddUser,
  onUpdateUser,
  onSelectActiveUser,
  onSetUserMessage,
  onClearUserMessage
} = userSlice.actions;

export default userSlice.reducer;
