import { FC, useState } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { saveUsername, selectUsername } from "store/userSlice";

import Required, { required } from "components/UI/Required";

const NameProtector: FC = () => {
  const username = useAppSelector(selectUsername);
  const dispatch = useAppDispatch();

  const [isActive, setIsActive] = useState<number>(username.length ? 0 : 1);

  function nameSaveHandler(value: Record<string, string>) {
    if (value.name.length) {
      dispatch(saveUsername(value.name));
      setIsActive(0);
    }
  }

  return (
    <NameProtectorComponent isActive={isActive}>
      <Content>
        <Title>Choose your username</Title>
        <Form
          onSubmit={nameSaveHandler}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name={"name"} validate={required}>
                {({ input, meta }) => (
                  <>
                    <Input
                      {...input}
                      onKeyPress={(event) => {
                        if (event.code === "Enter") {
                          handleSubmit();
                        }
                      }}
                    />
                    <Required metaData={meta} />
                  </>
                )}
              </Field>
            </form>
          )}
        />
      </Content>
    </NameProtectorComponent>
  );
};

export default NameProtector;

interface NameProtectorComponentInterface {
  isActive: number;
}

const NameProtectorComponent = styled.div<NameProtectorComponentInterface>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(169, 169, 169, 0.66);

  display: flex;
  align-items: center;
  justify-content: center;

  transform: scale(${(props) => props.isActive});
`;

const Content = styled.div`
  padding: 20px;
  border-radius: 15px;
  background: white;
`;

const Title = styled.div`
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input.attrs({
  placeholder: "Username",
})`
  box-shadow: 1px 5px 10px 2px rgba(34, 60, 80, 0.2);
  font-size: 18px;
  line-height: 22px;
  padding: 5px;
`;
