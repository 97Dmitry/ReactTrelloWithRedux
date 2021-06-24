import { RootState } from "../index";
import { createSelector } from "@reduxjs/toolkit";
import { iCard, iColumn, State } from "./columnInterfaces";

const selectSelf = (state: RootState) => state;

export const selectorColumns = createSelector(
  selectSelf,
  (state: RootState): State => {
    return state.columnState;
  }
);

export const selectorCard = (cardID: string, column: string) =>
  createSelector(selectSelf, (state: RootState): iCard => {
    return state.columnState[column].cards[cardID];
  });

export const selectorColumn = (column: string) =>
  createSelector(selectSelf, (state: RootState): iColumn => {
    return state.columnState[column];
  });
