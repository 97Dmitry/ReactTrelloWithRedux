import { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import { useAppSelector, useAppDispatch } from "store/hooks";
import {
  changeColumnName,
  createCard,
  selectorColumn,
} from "store/columnSlice";

import Card from "containers/Card";

import TextArea from "components/UI/TextArea";
import SuccessButton from "components/UI/SuccessButton";

interface ColumnProps {
  column: string;
}

const Column: FC<ColumnProps> = ({ column }) => {
  const columnState = useAppSelector(selectorColumn(column));
  const dispatch = useAppDispatch();
  const [isAddCard, setIsAddCard] = useState(false);
  const [cardNameInput, setCardNameInput] = useState("");
  const [columnNameInput, setColumnNameInput] = useState(
    columnState.columnTitle
  );
  const [isChangeName, setIsChangeName] = useState(false);

  function cardSaveHandler() {
    if (cardNameInput.length) {
      const id = uuidv4();
      dispatch(
        createCard({
          column,
          cardID: id,
          card: { title: cardNameInput, comments: {}, description: "" },
        })
      );
      setIsAddCard(!isAddCard);
      setCardNameInput("");
    }
  }

  return (
    <ColumnWrapper data-column={column}>
      {!isChangeName ? (
        <ColumnTitle onDoubleClick={() => setIsChangeName(!isChangeName)}>
          {columnState.columnTitle}
        </ColumnTitle>
      ) : (
        <ColumnNameInput
          value={columnNameInput}
          onChange={(event) => setColumnNameInput(event.target.value)}
          onBlur={() => {
            setIsChangeName(!isChangeName);
            dispatch(changeColumnName({ column, newName: columnNameInput }));
          }}
        />
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
          <TextArea
            styled={{ rows: 3 }}
            placeholder={"Input card name"}
            value={cardNameInput}
            onChange={(event) => {
              setCardNameInput(event.target.value);
            }}
          />
          <SuccessButton onClick={cardSaveHandler}>Add</SuccessButton>
          <CloseButton
            onClick={() => {
              setIsAddCard(!isAddCard);
              setCardNameInput("");
            }}
          >
            <i className="material-icons">edit_off</i>
          </CloseButton>
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
