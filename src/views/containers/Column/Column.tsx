import { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import { Form, Field } from "react-final-form";

import { useAppSelector, useAppDispatch } from "store/hooks";
import { changeColumnName, createCard } from "store/column/columnSlice";
import { selectorColumn } from "store/column/columnSelectors";

import { Card } from "views/containers/Card";

import TextArea from "views/components/UI/TextArea";
import SuccessButton from "views/components/UI/SuccessButton";
import Required, { required } from "views/components/UI/Required";

interface ColumnProps {
  column: string;
}

const Column: FC<ColumnProps> = ({ column }) => {
  const columnState = useAppSelector(selectorColumn(column));
  const dispatch = useAppDispatch();
  const [isAddCard, setIsAddCard] = useState(false);
  const [isChangeName, setIsChangeName] = useState(false);

  function cardSaveHandler(values: Record<string, string>) {
    if (values.cardName.length) {
      const id = uuidv4();
      dispatch(
        createCard({
          column,
          cardID: id,
          card: { title: values.cardName, comments: {}, description: "" },
        })
      );
      setIsAddCard(!isAddCard);
    }
  }
  function columnNameChangeHandler(values: Record<string, string>) {
    if (values.columnTitle.length) {
      dispatch(changeColumnName({ column, newName: values.columnTitle }));
    }
    setIsChangeName(!isChangeName);
  }

  return (
    <ColumnWrapper data-column={column}>
      {!isChangeName ? (
        <ColumnTitle onDoubleClick={() => setIsChangeName(!isChangeName)}>
          {columnState.columnTitle}
        </ColumnTitle>
      ) : (
        <>
          <Form
            onSubmit={columnNameChangeHandler}
            initialValues={columnState}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field name={"columnTitle"} validate={required}>
                  {({ input, meta }) => (
                    <>
                      <ColumnNameInput
                        {...input}
                        onBlur={() => {
                          handleSubmit();
                          setIsChangeName(!isChangeName);
                        }}
                      />
                      <Required metaData={meta} />
                    </>
                  )}
                </Field>
              </form>
            )}
          />
        </>
      )}
      <CardList>
        {Object.keys(columnState.cards)
          .filter((id: string) => id.length > 15)
          .map((id: string) => {
            return (
              <Card
                key={id}
                cardID={id}
                column={column}
                columnTitle={columnState.columnTitle}
              />
            );
          })}
      </CardList>
      {isAddCard ? (
        <>
          <Form
            onSubmit={cardSaveHandler}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field name={"cardName"} validate={required}>
                  {({ input, meta }) => (
                    <>
                      <TextArea
                        {...input}
                        styled={{ rows: 3 }}
                        placeholder={"Input card name"}
                      />
                      <Required metaData={meta} />
                    </>
                  )}
                </Field>
                <SuccessButton type={"submit"}>Add</SuccessButton>
                <CloseButton
                  type={"button"}
                  onClick={() => {
                    setIsAddCard(!isAddCard);
                  }}
                >
                  <i className="material-icons">edit_off</i>
                </CloseButton>
              </form>
            )}
          />
        </>
      ) : (
        <Button
          onClick={() => {
            setIsAddCard(!isAddCard);
          }}
          width={"100%"}
        >
          <i className="material-icons">note_add</i>Add another card
        </Button>
      )}
    </ColumnWrapper>
  );
};

export default Column;

const ColumnWrapper = styled.div`
  width: 25%;

  height: max-content;
  margin: 15px 20px 0;
  padding: 15px;
  background: #ebecf0;
`;

const ColumnTitle = styled.p`
  font-size: 30px;
  font-weight: 700;

  padding: 15px;
`;

const CardList = styled.div`
  max-height: 600px;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

const ColumnNameInput = styled.input`
  font-size: 30px;
  font-weight: 700;
  margin: 15px;
`;

interface ButtonProps {
  width: string;
}
const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 24px;
  width: ${(props) => props.width};
  &:hover {
    border-radius: 20px;
    background: darkgrey;
  }
`;

const buttonHeight = "32px";

const CloseButton = styled.button`
  width: 40px;
  vertical-align: bottom;
  font-size: ${buttonHeight};
  line-height: ${buttonHeight} !important;
`;
