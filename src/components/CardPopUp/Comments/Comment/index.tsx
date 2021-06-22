import { FC, useState } from "react";
import styled from "styled-components";
import { Button, TextareaAutosize } from "@material-ui/core";

import { lStorage } from "utils";

interface CommentInterface {
  commentID: string;
  column: string;
  cardID: string;
  cardsInfo: Record<string, any>;
  setCardsInfo: React.Dispatch<Record<string, any>>;
}

const Comment: FC<CommentInterface> = ({
  commentID,
  cardID,
  column,
  cardsInfo,
  setCardsInfo,
}) => {
  const [comment, setComment] = useState(
    cardsInfo[cardID]["comments"][commentID]["comment"]
  );

  function changeCommentHandler() {
    setCardsInfo(() => {
      const data = { ...cardsInfo };
      data[cardID]["comments"][commentID]["comment"] = comment;
      lStorage(column, { ...data });
      return data;
    });
  }

  function commentDeleteHandler() {
    setCardsInfo(() => {
      const data = { ...cardsInfo };
      delete data[cardID]["comments"][commentID];
      lStorage(column, { ...data });
      return data;
    });
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
          value={comment}
          style={{
            width: "95%",
            fontSize: "20px",
            resize: "none",
          }}
          onFocus={(event) => {
            event.target.style.outline = "2px solid #0079bf";
          }}
          onChange={(event) => {
            setComment(event.target.value);
          }}
          onBlur={(event) => {
            event.target.style.outline = "none";
            changeCommentHandler();
          }}
        />

        <p>Author: {cardsInfo[cardID]["comments"][commentID]["author"]}</p>
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
