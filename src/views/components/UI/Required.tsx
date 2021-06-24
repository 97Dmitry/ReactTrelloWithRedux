import { FC } from "react";
import styled from "styled-components";

export const required = (value: any) => (value ? undefined : "Required");

const Required: FC<{ metaData: any }> = ({ metaData }) => {
  return (
    <>
      {metaData.error && metaData.touched ? (
        <Style>Must be required</Style>
      ) : null}
    </>
  );
};

export default Required;

const Style = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: red;
  margin: 5px 0;
`;
