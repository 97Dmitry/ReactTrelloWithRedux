import { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import { useAppSelector, useAppDispatch } from "store/hooks";
import { createComment, selectorCard } from "store/columnSlice";

import Comment from "./Comment";
import { selectUsername } from "store/usernameSlice";

interface CommentsInterface {
  column: string;
  cardID: string;
}
const Comments: FC<CommentsInterface> = ({ column, cardID }) => {
  const card = useAppSelector(selectorCard(cardID, column));
  const author = useAppSelector(selectUsername);
  const dispatch = useAppDispatch();

  const [commentInput, setCommentInput] = useState("");

  function commentSaveHandler() {
    const id = uuidv4();
    dispatch(
      createComment({
        comment: commentInput,
        commentID: id,
        column,
        cardID,
        author,
      })
    );
  }

  return (
    <>
      {Object.keys(card.comments).length ? (
        <>
          <p style={{ marginTop: "10px" }}>All comments:</p>
          <AllComments>
            {Object.keys(card.comments).map((e: string) => {
              return (
                <Comment
                  cardID={cardID}
                  commentID={e}
                  column={column}
                  key={e}
                />
              );
            })}
          </AllComments>
        </>
      ) : null}

      <p style={{ marginBottom: "10px" }}>Input comment: </p>
      <CommentInput
        value={commentInput}
        onChange={(event) => {
          setCommentInput(event.target.value);
        }}
        placeholder={"Write something"}
      />
      <AddButton
        onClick={() => {
          if (commentInput.length) {
            commentSaveHandler();
            setCommentInput("");
          }
        }}
      >
        Add comment
      </AddButton>
    </>
  );
};

export default Comments;

const AllComments = styled.div`
  max-height: 400px;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 0;
  }
`;

const CommentInput = styled.textarea`
  border: #2a2a2a 1px solid;
  border-radius: 15px;
  padding: 10px;

  width: 40%;

  resize: none;
`;

const AddButton = styled.button`
  display: block;

  height: 30px;
  width: 100px;
  background: green;
  color: white;
  border-radius: 20px;
`;
