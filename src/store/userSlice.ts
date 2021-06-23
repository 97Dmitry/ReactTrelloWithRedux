import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
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

const selectSelf = (state: RootState) => state;

export const selectUsername = createDraftSafeSelector(
  selectSelf,
  (state: RootState) => state.userState.username
);

export default userSlice.reducer;
export const { saveUsername } = userSlice.actions;
