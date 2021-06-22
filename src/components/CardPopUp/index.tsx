import React, { useEffect } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import styled from "styled-components";
import { lStorage } from "utils";
import Comments from "./Comments";
import Description from "components/Description";

interface CardPopUpInterface {
  cardName: string;
  setCardName: React.Dispatch<string>;
  column: string;
  columnTitle: string;
  cardID: string;
  cardsInfo: Record<string, any>;
  setCardsInfo: React.Dispatch<Record<string, any>>;
  isActive: boolean;
  setIsActive: React.Dispatch<boolean>;
}

const CardPopUp: React.FC<CardPopUpInterface> = ({
  cardName,
  setCardName,
  column,
  columnTitle,
  cardID,
  cardsInfo,
  setCardsInfo,
  isActive,
  setIsActive,
}) => {
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
    setCardsInfo(() => {
      const data = { ...cardsInfo };
      data[cardID]["title"] = cardName;
      lStorage(column, { ...data });
      return data;
    });
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
          <TextareaAutosize
            style={{
              width: "100%",
              fontSize: "20px",
              resize: "none",
            }}
            onFocus={(event) => {
              event.target.style.outline = "2px solid #0079bf";
            }}
            value={cardName}
            onChange={(event) => {
              setCardName((cardName = event.target.value));
            }}
            onBlur={(event) => {
              event.target.style.outline = "none";
              cardNameChangeHandler();
            }}
          />
        </>
        <p>
          in column:{" "}
          <span style={{ fontSize: "18px", fontWeight: 700 }}>
            {columnTitle}
          </span>
        </p>
        <p>
          Author:{" "}
          <span style={{ fontSize: "18px", fontWeight: 700 }}>
            {localStorage.getItem("username")}
          </span>
        </p>
        <Description
          cardID={cardID}
          column={column}
          cardsInfo={cardsInfo}
          setCardsInfo={setCardsInfo}
        />
        <Comments
          cardID={cardID}
          column={column}
          cardsInfo={cardsInfo}
          setCardsInfo={setCardsInfo}
        />
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
  background: white;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 5vw;
  top: 10vh;

  background: none;
`;
