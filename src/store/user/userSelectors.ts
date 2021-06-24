import { RootState } from "../index";
import { createSelector } from "@reduxjs/toolkit";

export const selectSelf = (state: RootState) => state;

export const selectUsername = createSelector(
  selectSelf,
  (state: RootState) => state.userState.username
);
