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
`;

export default TextArea;
