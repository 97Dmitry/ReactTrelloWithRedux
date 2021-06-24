import { FC } from "react";
import styled from "styled-components";

import { useAppSelector } from "store/hooks";
import { selectorColumns } from "store/columnSlice";

import Column from "views/containers/Column";

const Board: FC = () => {
  const columns = useAppSelector(selectorColumns);
  return (
    <BoardStyle>
      {Object.keys(columns).map((column) => (
        <Column column={columns[column].column} key={columns[column].column} />
      ))}
    </BoardStyle>
  );
};

export default Board;

const BoardStyle = styled.div`
  display: flex;

  width: 100%;
  max-width: 100%;
  margin: 25px;
  border-radius: 20px;
  background: rgba(40, 174, 203, 0.85);
`;
