import React, { useEffect } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";

import { useAppSelector, useAppDispatch } from "store/hooks";
import { cardNameChanger, selectorCard } from "store/columnSlice";

import Comments from "components/Comments";
import Description from "components/Description";

import TextArea from "components/UI/TextArea";
import Required, { required } from "components/UI/Required";

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

  function cardNameChangeHandler(value: Record<string, string>) {
    if (value.title.length) {
      dispatch(cardNameChanger({ cardID, column, newName: value.title }));
    }
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
          <Form
            onSubmit={cardNameChangeHandler}
            initialValues={card}
            render={({ handleSubmit, form }) => (
              <form>
                <Field name={"title"} validate={required}>
                  {({ input, meta }) => (
                    <>
                      <TextArea
                        {...input}
                        styled={{ rows: 1 }}
                        onBlur={() => {
                          handleSubmit();
                          form.restart();
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
