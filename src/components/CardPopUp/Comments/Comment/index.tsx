import { FC, useState } from "react";
import styled from "styled-components";
import { Button, TextareaAutosize } from "@material-ui/core";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectUsername } from "store/usernameSlice";
import { changeComment, deleteComment, selectorCard } from "store/columnSlice";

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
        <TextareaAutosize
          value={commentInput}
          style={{
            width: "95%",
            fontSize: "20px",
            resize: "none",
          }}
          onFocus={(event) => {
            event.target.style.outline = "2px solid #0079bf";
          }}
          onChange={(event) => {
            setCommentInput(event.target.value);
          }}
          onBlur={(event) => {
            event.target.style.outline = "none";
            changeCommentHandler();
          }}
        />

        <p>Author: {author}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={commentDeleteHandler}
        >
          Delete
        </Button>
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
