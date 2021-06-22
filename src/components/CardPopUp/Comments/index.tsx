import { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { lStorage } from "utils";
import styled from "styled-components";
import Comment from "./Comment";

interface CommentsInterface {
  column: string;
  cardID: string;
  cardsInfo: Record<string, any>;
  setCardsInfo: React.Dispatch<Record<string, any>>;
}
const Comments: FC<CommentsInterface> = ({
  column,
  cardID,
  cardsInfo,
  setCardsInfo,
}) => {
  const [comment, setComment] = useState("");

  function commentSaveHandler() {
    const id = uuidv4();
    setCardsInfo(() => {
      const data = cardsInfo;
      data[cardID]["comments"][id] = {
        comment,
        author: localStorage.getItem("username"),
        // stateAuthor: state.username
      };
      lStorage(column, { ...data });
      return data;
    });
  }

  return (
    <>
      {Object.keys(cardsInfo[cardID]["comments"]).length ? (
        <>
          <p style={{ marginTop: "10px" }}>All comments:</p>
          <AllComments>
            {Object.keys(cardsInfo[cardID]["comments"]).map((e: string) => {
              return (
                <Comment
                  cardsInfo={cardsInfo}
                  setCardsInfo={setCardsInfo}
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
        value={comment}
        onChange={(event) => {
          setComment(event.target.value);
        }}
        placeholder={"Write something"}
      />
      <AddButton
        onClick={() => {
          commentSaveHandler();
          setComment("");
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
