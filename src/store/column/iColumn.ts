export interface Comments {
  comment: string;
  author: string;
}

export interface iCard {
  title: string;
  description: string;
  comments: Record<string, Comments>;
}

export interface iColumn {
  columnTitle: string;
  column: string;
  cards: Record<string, iCard>;
}

export type State = Record<string, iColumn>;

export interface iCreateColumn {
  column: string;
  columnTitle: string;
}

export interface iChangeColumnName {
  newName: string;
  column: string;
}

export interface iCreateCard {
  column: string;
  cardID: string;
  card: iCard;
}

export interface iDeleteCard {
  column: string;
  cardID: string;
}

export interface iChangeCard {
  column: string;
  cardID: string;
  newName: string;
}

export interface iCreateOrChangeComment {
  column: string;
  cardID: string;
  commentID: string;
  comment: string;
  author: string;
}

export interface iDeleteComment {
  column: string;
  cardID: string;
  commentID: string;
}

export interface iCreateDescription {
  description: string;
  column: string;
  cardID: string;
}
