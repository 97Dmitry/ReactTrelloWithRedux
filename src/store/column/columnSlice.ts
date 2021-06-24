import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  iChangeCard,
  iChangeColumnName,
  iCreateCard,
  iCreateColumn,
  iCreateDescription,
  iCreateOrChangeComment,
  iDeleteCard,
  iDeleteComment,
  State,
} from "./iColumn";

const initialState: State = {
  todo: {
    columnTitle: "TODO",
    column: "todo",
    cards: {},
  },
  progress: {
    columnTitle: "In Progress",
    column: "progress",
    cards: {},
  },
  testing: {
    columnTitle: "Testing",
    column: "testing",
    cards: {},
  },
  done: {
    columnTitle: "Done",
    column: "done",
    cards: {},
  },
};

export const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {
    createColumn: (state, action: PayloadAction<iCreateColumn>) => {
      state[action.payload.column] = {
        columnTitle: action.payload.columnTitle,
        column: action.payload.column,
        cards: {},
      };
    },
    changeColumnName: (state, action: PayloadAction<iChangeColumnName>) => {
      state[action.payload.column].columnTitle = action.payload.newName;
    },
    createCard: (state, action: PayloadAction<iCreateCard>) => {
      state[action.payload.column].cards[action.payload.cardID] =
        action.payload.card;
    },
    deleteCard: (state, action: PayloadAction<iDeleteCard>) => {
      delete state[action.payload.column].cards[action.payload.cardID];
    },
    cardNameChanger: (state, action: PayloadAction<iChangeCard>) => {
      state[action.payload.column].cards[action.payload.cardID].title =
        action.payload.newName;
    },
    createComment: (state, action: PayloadAction<iCreateOrChangeComment>) => {
      state[action.payload.column].cards[action.payload.cardID].comments[
        action.payload.commentID
      ] = { comment: action.payload.comment, author: action.payload.author };
    },
    changeComment: (state, action: PayloadAction<iCreateOrChangeComment>) => {
      state[action.payload.column].cards[action.payload.cardID].comments[
        action.payload.commentID
      ] = { comment: action.payload.comment, author: action.payload.author };
    },
    deleteComment: (state, action: PayloadAction<iDeleteComment>) => {
      delete state[action.payload.column].cards[action.payload.cardID].comments[
        action.payload.commentID
      ];
    },
    createDescription: (state, action: PayloadAction<iCreateDescription>) => {
      state[action.payload.column].cards[action.payload.cardID].description =
        action.payload.description;
    },
  },
});

export default columnSlice.reducer;
export const {
  createColumn,
  changeColumnName,
  createCard,
  deleteCard,
  cardNameChanger,
  createComment,
  changeComment,
  deleteComment,
  createDescription,
} = columnSlice.actions;
