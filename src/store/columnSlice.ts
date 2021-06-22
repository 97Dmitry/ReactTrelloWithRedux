import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface iComments {
  comment: string;
  author: string;
}

interface iCard {
  title?: string;
  description?: string;
  comments?: Record<string, iComments>;
}

interface iColumn {
  columnTitle: string;
  column: string;
  cardInfo?: Record<string, iCard>;
}

type iState = Record<string, iColumn>;

const initialState: iState = {
  todo: {
    columnTitle: "TODO",
    column: "todo",
    cardInfo: {},
  },
  progress: {
    columnTitle: "In Progress",
    column: "progress",
    cardInfo: {},
  },
  testing: {
    columnTitle: "Testing",
    column: "testing",
    cardInfo: {},
  },
  done: {
    columnTitle: "Done",
    column: "done",
    cardInfo: {},
  },
};

interface iCreateColumn {
  column: string;
  columnTitle: string;
}

interface iChangeColumnName {
  newName: string;
  column: string;
}

export const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {
    createColumn: (state, action: PayloadAction<iCreateColumn>): void => {
      state[action.payload.column] = {
        columnTitle: action.payload.columnTitle,
        column: action.payload.column,
        cardInfo: {},
      };
    },
    changeColumnName: (
      state,
      action: PayloadAction<iChangeColumnName>
    ): void => {
      state[action.payload.column].columnTitle = action.payload.newName;
    },
  },
});

export default columnSlice.reducer;

export const selectorColumn =
  (column: string) =>
  (state: RootState): iColumn => {
    return state.columnState[column];
  };
export const selectorColumns = (state: RootState) => {
  return state.columnState;
};

export const { createColumn } = columnSlice.actions;
