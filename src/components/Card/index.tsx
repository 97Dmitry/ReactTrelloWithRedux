import { FC, useState } from "react";
import styled from "styled-components";

import CardPopUp from "components/CardPopUp";
import { lStorage } from "utils";

interface CardInterface {
  cardName: string;
  column: string;
  columnTitle: string;
  cardID: string;
  cardsInfo: Record<string, any>;
  setCardsInfo: React.Dispatch<Record<string, any>>;
}

const Card: FC<CardInterface> = ({
  cardName,
  cardID,
  column,
  columnTitle,
  cardsInfo,
  setCardsInfo,
}) => {
  const [popUpIsActive, setPopUpIsActive] = useState(false);
  const [cardNameState, setCardNameState] = useState(cardName);

  function cardDeleteHandler() {
    setCardsInfo(() => {
      const data = { ...cardsInfo };
      delete data[cardID];
      lStorage(column, { ...data });
      return data;
    });
  }

  return (
    <>
      <CardComponent
        onClick={() => setPopUpIsActive(() => !popUpIsActive)}
        data-type="Card"
      >
        <CardText>{cardNameState}</CardText>
        <Delete onClick={cardDeleteHandler}>
          <i className="material-icons">delete</i>
        </Delete>
        {Object.keys(cardsInfo[cardID]["comments"]).length ? (
          <>
            <hr style={{ border: "1px solid black", marginTop: "5px" }} />
            <br />
            <p>
              Comments count:{" "}
              {Object.keys(cardsInfo[cardID]["comments"]).length}
            </p>
          </>
        ) : null}
      </CardComponent>
      {popUpIsActive ? (
        <CardPopUp
          cardName={cardNameState}
          setCardName={setCardNameState}
          cardID={cardID}
          column={column}
          columnTitle={columnTitle}
          cardsInfo={cardsInfo}
          setCardsInfo={setCardsInfo}
          isActive={popUpIsActive}
          setIsActive={setPopUpIsActive}
        />
      ) : null}
    </>
  );
};

export default Card;

const CardComponent = styled.div`
  position: relative;
  box-shadow: 1px 5px 10px 2px rgba(34, 60, 80, 0.2);
  background: white;
  padding: 5px;
  width: 100%;

  margin-bottom: 10px;

  &:hover {
    background: #f4f5f7;
  }
`;

const CardText = styled.p`
  padding-right: 15px;
  word-break: break-word;
  word-wrap: break-word;
`;

const Delete = styled.button`
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  background: none;

  &:hover {
    color: red;
  }
`;
