import { FC, useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

import { selectorCard, createDescription } from "store/columnSlice";
import { useAppSelector, useAppDispatch } from "store/hooks";

import TextArea from "components/UI/TextArea";

interface DescriptionInterface {
  column: string;
  cardID: string;
}

const Description: FC<DescriptionInterface> = ({ column, cardID }) => {
  const card = useAppSelector(selectorCard(cardID, column));
  const dispatch = useAppDispatch();

  const [descriptionInput, setDescriptionInput] = useState(card.description);

  function changeDescriptionHandler() {
    dispatch(
      createDescription({ description: descriptionInput, cardID, column })
    );
  }

  return (
    <DescriptionComponent>
      <Title>Card description: </Title>
      <TextArea
        value={descriptionInput}
        styled={{ rows: 3 }}
        placeholder={"Write card description"}
        onFocus={(event) => {
          event.target.style.outline = "2px solid #0079bf";
        }}
        onChange={(event) => {
          setDescriptionInput(event.target.value);
        }}
        onBlur={(event) => {
          event.target.style.outline = "none";
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={changeDescriptionHandler}
      >
        Save or change
      </Button>
    </DescriptionComponent>
  );
};

export default Description;

const DescriptionComponent = styled.div`
  margin: 10px 0;
`;

const Title = styled.p`
  margin-bottom: 10px;
`;
