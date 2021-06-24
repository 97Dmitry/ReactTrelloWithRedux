import { FC, useState } from "react";
import styled from "styled-components";

import { useAppSelector, useAppDispatch } from "store/hooks";
import { deleteCard } from "store/column/columnSlice";
import { selectorCard } from "store/column/columnSelectors";

import { CardPopUp } from "views/containers/CardPopUp";
import DeleteButton from "views/components/UI/DeleteButton";

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
        <CardText>
          <p>{card.title}</p>
          <DeleteButton onClick={cardDeleteHandler}>
            <i className="material-icons">delete</i>
          </DeleteButton>
        </CardText>

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

const CardText = styled.div`
  display: flex;
  justify-content: space-between;
  word-break: break-word;
  word-wrap: break-word;
`;
