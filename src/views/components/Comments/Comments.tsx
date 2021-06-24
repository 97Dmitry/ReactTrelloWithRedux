import { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { Form, Field } from "react-final-form";

import { useAppSelector, useAppDispatch } from "store/hooks";
import { createComment } from "store/column/columnSlice";
import { selectorCard } from "store/column/columnSelectors";
import { selectUsername } from "store/user/userSelectors";

import { Comment } from "views/components/Comment";
import TextArea from "views/components/UI/TextArea";
import SuccessButton from "views/components/UI/SuccessButton";
import Required, { required } from "views/components/UI/Required";

interface CommentsInterface {
  column: string;
  cardID: string;
}
const Comments: FC<CommentsInterface> = ({ column, cardID }) => {
  const card = useAppSelector(selectorCard(cardID, column));
  const author = useAppSelector(selectUsername);
  const dispatch = useAppDispatch();

  function commentSaveHandler(value: Record<string, string>) {
    if (value.comment.length) {
      const id = uuidv4();
      dispatch(
        createComment({
          comment: value.comment,
          commentID: id,
          column,
          cardID,
          author,
        })
      );
    }
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
      <Form
        onSubmit={commentSaveHandler}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit}>
            <Field name={"comment"} validate={required}>
              {({ input, meta }) => (
                <>
                  <TextArea
                    {...input}
                    styled={{ rows: 2 }}
                    placeholder={"Write something"}
                  />
                  <Required metaData={meta} />
                  <SuccessButton
                    type={"button"}
                    onClick={() => {
                      handleSubmit();
                      form.restart();
                    }}
                  >
                    Add comment
                  </SuccessButton>
                </>
              )}
            </Field>
          </form>
        )}
      />
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
