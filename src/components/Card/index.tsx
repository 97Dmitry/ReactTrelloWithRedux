import { FC, useState } from "react";
import styled from "styled-components";

import { useAppSelector, useAppDispatch } from "store/hooks";
import { deleteCard, selectorCard } from "store/columnSlice";

import CardPopUp from "components/CardPopUp";

interface CardInterface {
  column: string;
  columnTitle: string;
  cardID: string;
}

const Card: FC<CardInterface> = ({ cardID, column, columnTitle }) => {
  const card = useAppSelector(selectorCard(cardID, column));
  const dispatch = useAppDispatch();
  const [popUpIsActive, setPopUpIsActive] = useState(false);

  function cardDeleteHandler() {
    dispatch(deleteCard({ column, cardID }));
  }
  return (
    <>
      <CardComponent
        onClick={() => setPopUpIsActive(() => !popUpIsActive)}
        data-type="Card"
      >
        <CardText>{card.title}</CardText>
        <Delete onClick={cardDeleteHandler}>
          <i className="material-icons">delete</i>
        </Delete>
        {Object.keys(card.comments).length ? (
          <>
            <hr style={{ border: "1px solid black", marginTop: "5px" }} />
            <br />
            <p>Comments count: {Object.keys(card.comments).length}</p>
          </>
        ) : null}
      </CardComponent>
      {popUpIsActive ? (
        <CardPopUp
          cardID={cardID}
          column={column}
          columnTitle={columnTitle}
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
