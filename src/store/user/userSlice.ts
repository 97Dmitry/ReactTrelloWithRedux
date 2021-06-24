import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iState } from "./iUser";


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
export const { saveUsername } = userSlice.actions;
