import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface iState {
  username: string;
}

const initialState: iState = {
  username: "",
};

export const userSlice = createSlice({
  name: "username",
  initialState,
  reducers: {
    saveUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export default userSlice.reducer;

export const selectUsername = (state: RootState) => state.userState.username;

export const { saveUsername } = userSlice.actions;
