import { FC } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";

import { selectorCard, createDescription } from "store/columnSlice";
import { useAppSelector, useAppDispatch } from "store/hooks";

import TextArea from "components/UI/TextArea";
import SuccessButton from "components/UI/SuccessButton";
import Required, { required } from "components/UI/Required";

interface DescriptionInterface {
  column: string;
  cardID: string;
}

const Description: FC<DescriptionInterface> = ({ column, cardID }) => {
  const card = useAppSelector(selectorCard(cardID, column));
  const dispatch = useAppDispatch();

  function changeDescriptionHandler(value: Record<string, string>) {
    dispatch(
      createDescription({ description: value.description, cardID, column })
    );
  }

  return (
    <DescriptionComponent>
      <Title>Card description: </Title>
      <Form
        onSubmit={changeDescriptionHandler}
        initialValues={card}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name={"description"} validate={required}>
              {({ input, meta }) => (
                <>
                  <TextArea
                    {...input}
                    styled={{ rows: 2 }}
                    placeholder={"Write card description"}
                  />
                  <Required metaData={meta} />
                </>
              )}
            </Field>
            <SuccessButton type={"submit"}>Save or change</SuccessButton>
          </form>
        )}
      />
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
