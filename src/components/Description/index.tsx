import { FC, useState } from "react";
import styled from "styled-components";
import { Button, TextareaAutosize } from "@material-ui/core";

import { lStorage } from "utils";

const DescriptionComponent = styled.div`
  margin: 10px 0;
`;

interface DescriptionInterface {
  column: string;
  cardID: string;
  cardsInfo: Record<string, any>;
  setCardsInfo: React.Dispatch<Record<string, any>>;
}
const Description: FC<DescriptionInterface> = ({
  column,
  cardID,
  cardsInfo,
  setCardsInfo,
}) => {
  const [description, setDescription] = useState(
    lStorage(column)[cardID]["description"] || ""
  );

  function changeDescriptionHandler() {
    setCardsInfo(() => {
      const data = { ...cardsInfo };
      data[cardID]["description"] = description;
      lStorage(column, { ...data });
      return data;
    });
  }

  return (
    <DescriptionComponent>
      <p style={{ marginBottom: "10px" }}>Card description: </p>
      <TextareaAutosize
        value={description}
        rowsMin={3}
        placeholder={"Write card description"}
        style={{
          width: "100%",
          fontSize: "20px",
          resize: "none",
        }}
        onFocus={(event) => {
          event.target.style.outline = "2px solid #0079bf";
        }}
        onChange={(event) => {
          setDescription(event.target.value);
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
