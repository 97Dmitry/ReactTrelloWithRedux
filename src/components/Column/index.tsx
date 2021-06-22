import { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import { lStorage } from "utils";
import Card from "components/Card";
import { useAppSelector } from "../../store/hooks";
import { selectorColumn } from "../../store/columnSlice";

interface ColumnProps {
  column: string;
  columnTitle: string;
}

const Column: FC<ColumnProps> = ({ column, columnTitle }) => {
  const [isAddCard, setIsAddCard] = useState(false);
  const [cardNameInput, setCardNameInput] = useState("");
  const [name, setName] = useState(lStorage(column)?.name || columnTitle);
  const [isChangeName, setIsChangeName] = useState(false);
  const [cardsInfo, setCardsInfo] = useState<Record<string, any>>(
    lStorage(column) || {}
  );

  function cardSaveHandler() {
    if (cardNameInput.length) {
      setCardsInfo(() => {
        const data = { ...cardsInfo };
        data[uuidv4()] = {
          title: cardNameInput,
          description: "",
          comments: {},
        };
        lStorage(column, { ...data });
        return data;
      });
      setIsAddCard(!isAddCard);
      setCardNameInput("");
    }
  }

  return (
    <ColumnWrapper data-column={column}>
      {!isChangeName ? (
        <ColumnTitle onDoubleClick={() => setIsChangeName(!isChangeName)}>
          {name}
        </ColumnTitle>
      ) : (
        <ColumnNameInput
          value={name}
          onChange={(event) => setName(event.target.value)}
          onBlur={() => {
            setIsChangeName(!isChangeName);
            setCardsInfo(() => {
              const data = { ...cardsInfo };
              data.name = name;
              lStorage(column, { ...data });
              return data;
            });
          }}
        />
      )}
      <CardList>
        {Object.keys(cardsInfo)
          .filter((id: string) => id.length > 15)
          .map((id: string) => {
            return (
              <Card
                cardName={cardsInfo[id].title}
                key={id}
                cardID={id}
                column={column}
                columnTitle={name}
                cardsInfo={{ ...cardsInfo }}
                setCardsInfo={setCardsInfo}
              />
            );
          })}
      </CardList>
      {isAddCard ? (
        <>
          <Input
            placeholder={"Input card name"}
            value={cardNameInput}
            onChange={(event) => {
              setCardNameInput(event.target.value);
            }}
          />
          <AddButton onClick={cardSaveHandler}>Add</AddButton>
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

const Input = styled.textarea`
  box-shadow: 1px 5px 10px 2px rgba(34, 60, 80, 0.2);
  width: 100%;
  min-height: 80px;
  padding: 10px;
  margin-bottom: 5px;
`;

const buttonHeight = "32px";

const AddButton = styled.button`
  background: #0079bf;
  padding: 5px 25px;
  border-radius: 15px;
  height: ${buttonHeight};
`;

const CloseButton = styled.button`
  width: 40px;
  vertical-align: bottom;
  font-size: ${buttonHeight};
  line-height: ${buttonHeight} !important;
`;
