import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface iState {
  username: string;
}

const initialState: iState = {
  username: "",
};

export const appSlice = createSlice({
  name: "username",
  initialState,
  reducers: {
    saveUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export default appSlice.reducer;

export const selectUsername = (state: RootState) =>
  state.usernameState.username;

export const { saveUsername } = appSlice.actions;
