import { FC, useState } from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectUsername } from "store/userSlice";
import { changeComment, deleteComment, selectorCard } from "store/columnSlice";

import TextArea from "components/UI/TextArea";
import DeleteButton from "components/UI/DeleteButton";

interface CommentInterface {
  commentID: string;
  column: string;
  cardID: string;
}

const Comment: FC<CommentInterface> = ({ commentID, cardID, column }) => {
  const author = useAppSelector(selectUsername);
  const card = useAppSelector(selectorCard(cardID, column));
  const dispatch = useAppDispatch();

  const [commentInput, setCommentInput] = useState(
    card.comments[commentID].comment
  );

  function changeCommentHandler() {
    dispatch(
      changeComment({
        commentID,
        comment: commentInput,
        column,
        cardID,
        author,
      })
    );
  }

  function commentDeleteHandler() {
    dispatch(deleteComment({ commentID, cardID, column }));
  }

  return (
    <CommentComponent>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <p>Comment:</p>
        <CommentLine>
          <TextArea
            styled={{ rows: 1, width: 98 }}
            value={commentInput}
            onChange={(event) => {
              setCommentInput(event.target.value);
            }}
            onBlur={() => {
              changeCommentHandler();
            }}
          />
          <DeleteButton onClick={commentDeleteHandler}>
            <i className="material-icons">delete</i>
          </DeleteButton>
        </CommentLine>
        <p>Author: {author}</p>
      </div>
    </CommentComponent>
  );
};

export default Comment;

const CommentComponent = styled.div`
  border: 1px solid #2a2a2a;
  border-radius: 15px;
  padding: 10px;
  margin-top: 4px;
  word-wrap: break-word;

  display: flex;
  justify-content: space-between;
`;

const CommentLine = styled.div`
  display: flex;
  justify-content: space-between;
`;
