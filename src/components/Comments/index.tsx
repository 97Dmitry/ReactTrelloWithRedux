import { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import { useAppSelector, useAppDispatch } from "store/hooks";
import { createComment, selectorCard } from "store/columnSlice";
import { selectUsername } from "store/userSlice";

import Comment from "./Comment";

import TextArea from "components/UI/TextArea";
import SuccessButton from "components/UI/SuccessButton";

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
      <TextArea
        styled={{ rows: 2 }}
        value={commentInput}
        onChange={(event) => {
          setCommentInput(event.target.value);
        }}
        placeholder={"Write something"}
      />
      <SuccessButton
        onClick={() => {
          if (commentInput.length) {
            commentSaveHandler();
            setCommentInput("");
          }
        }}
      >
        Add comment
      </SuccessButton>
    </>
  );
};

export default Comments;

const AllComments = styled.div`
  max-height: 320px;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 0;
  }
`;
