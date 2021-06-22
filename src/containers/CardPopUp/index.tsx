import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useAppSelector, useAppDispatch } from "store/hooks";
import { cardNameChanger, selectorCard } from "store/columnSlice";

import Comments from "components/Comments";
import Description from "components/Description";

import TextArea from "components/UI/TextArea";

interface CardPopUpInterface {
  column: string;
  columnTitle: string;
  cardID: string;
  isActive: boolean;
  setIsActive: React.Dispatch<boolean>;
}

const CardPopUp: React.FC<CardPopUpInterface> = ({
  column,
  columnTitle,
  cardID,
  isActive,
  setIsActive,
}) => {
  const card = useAppSelector(selectorCard(cardID, column));
  const dispatch = useAppDispatch();

  const [cardNameInput, setCardNameInput] = useState<string>(card.title);

  useEffect(() => {
    const escFunction = (event: KeyboardEvent) => {
      if (isActive && event.code === "Escape") {
        setIsActive(!isActive);
      }
    };
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [isActive, setIsActive]);

  function cardNameChangeHandler() {
    dispatch(cardNameChanger({ cardID, column, newName: cardNameInput }));
  }

  return (
    <CardPopUpComponent>
      <CloseButton onClick={() => setIsActive((isActive = !isActive))}>
        <i className="material-icons" style={{ fontSize: "55px" }}>
          close
        </i>
      </CloseButton>
      <Content>
        <>
          <strong>Card name:</strong>
          <TextArea
            styled={{ rows: 1 }}
            onFocus={(event) => {
              event.target.style.outline = "2px solid #0079bf";
            }}
            value={cardNameInput}
            onChange={(event) => {
              setCardNameInput(event.target.value);
            }}
            onBlur={(event) => {
              event.target.style.outline = "none";
              cardNameChangeHandler();
            }}
          />
        </>
        <p>
          in column: <SpanFrom>{columnTitle}</SpanFrom>
        </p>
        <p>
          Author: <SpanFrom>{localStorage.getItem("username")}</SpanFrom>
        </p>
        <Description cardID={cardID} column={column} />
        <Comments cardID={cardID} column={column} />
      </Content>
    </CardPopUpComponent>
  );
};

export default CardPopUp;

const CardPopUpComponent = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;

  width: 100vw;
  height: 100vh;

  background: rgba(169, 169, 169, 0.66);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 50%;
  padding: 20px;
  border-radius: 15px;
  background: #ebecf0;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 5vw;
  top: 10vh;

  background: none;
`;

const SpanFrom = styled.span`
  font-size: 18px;
  font-weight: 700;
`;
