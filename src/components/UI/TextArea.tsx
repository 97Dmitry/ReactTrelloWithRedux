import styled from "styled-components";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

interface iTextArea {
  styled: {
    rows: number;
    width?: number;
  };
}

const TextArea = styled(TextareaAutosize).attrs<iTextArea>((props) => ({
  rows: props.styled.rows,
}))`
  width: ${(props: iTextArea) => props.styled.width || 100}%;
  font-size: 20px;
  resize: none;
  margin: 5px 0;
  padding: 5px;
  box-shadow: 1px 5px 10px 2px rgba(34, 60, 80, 0.2);
  &:focus {
    outline: 2px solid #0079bf !important;
  }
`;

export default TextArea;
