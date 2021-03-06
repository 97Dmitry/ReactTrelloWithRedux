import { FC } from "react";
import styled from "styled-components";

import { Board } from "views/containers/Board";
import { NameProtector } from "./views/components/NameProtector";

const App: FC = (): any => {
  return (
    <AppWrapper>
      <Board />
      <NameProtector />
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;
