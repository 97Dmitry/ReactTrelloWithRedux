import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface iComments {
  comment: string;
  author: string;
}

interface iCard {
  title: string;
  description: string;
  comments: Record<string, iComments>;
}

interface iColumn {
  columnTitle: string;
  column: string;
  cards: Record<string, iCard>;
}

type iState = Record<string, iColumn>;

const initialState: iState = {
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

interface iCreateColumn {
  column: string;
  columnTitle: string;
}

interface iChangeColumnName {
  newName: string;
  column: string;
}

interface iCreateCard {
  column: string;
  cardID: string;
  card: iCard;
}

interface iDeleteCard {
  column: string;
  cardID: string;
}

interface iChangeCard {
  column: string;
  cardID: string;
  newName: string;
}

interface iCreateOrChangeComment {
  column: string;
  cardID: string;
  commentID: string;
  comment: string;
  author: string;
}

interface iDeleteComment {
  column: string;
  cardID: string;
  commentID: string;
}

interface iCreateDescription {
  description: string;
  column: string;
  cardID: string;
}

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

export const selectorColumn =
  (column: string) =>
  (state: RootState): iColumn => {
    return state.columnState[column];
  };

export const selectorColumns = (state: RootState) => {
  return state.columnState;
};
export const selectorCard =
  (cardID: string, column: string) => (state: RootState) => {
    return state.columnState[column].cards[cardID];
  };

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
