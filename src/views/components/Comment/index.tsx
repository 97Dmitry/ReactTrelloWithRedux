import { FC } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectUsername } from "store/userSlice";
import { changeComment, deleteComment, selectorCard } from "store/columnSlice";

import TextArea from "views/components/UI/TextArea";
import DeleteButton from "views/components/UI/DeleteButton";
import Required, { required } from "views/components/UI/Required";

interface CommentInterface {
  commentID: string;
  column: string;
  cardID: string;
}

const Comment: FC<CommentInterface> = ({ commentID, cardID, column }) => {
  const author = useAppSelector(selectUsername);
  const card = useAppSelector(selectorCard(cardID, column));
  const dispatch = useAppDispatch();

  function changeCommentHandler(value: Record<string, string>) {
    if (value.comment.length) {
      dispatch(
        changeComment({
          commentID,
          comment: value.comment,
          column,
          cardID,
          author,
        })
      );
    }
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
          <Form
            onSubmit={changeCommentHandler}
            initialValues={card.comments[commentID]}
            render={({ handleSubmit, form }) => (
              <InputForm>
                <Field name={"comment"} validate={required}>
                  {({ input, meta }) => (
                    <>
                      <TextArea
                        {...input}
                        styled={{ rows: 1 }}
                        onBlur={() => {
                          handleSubmit();
                          form.reset();
                        }}
                      />
                      <Required metaData={meta} />
                    </>
                  )}
                </Field>
              </InputForm>
            )}
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

const InputForm = styled.form`
  width: 100%;
`;
