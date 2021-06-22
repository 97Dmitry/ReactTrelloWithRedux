import styled from "styled-components";
import Button from "@material-ui/core/Button";

interface iSuccessButton {
  styled?: {
    width?: number;
  };
}

const SuccessButton = styled(Button).attrs<iSuccessButton>(() => ({
  variant: "contained",
}))`
  background-color: #009513 !important;
  color: aliceblue !important;
  width: ${(props: iSuccessButton) => props?.styled?.width}px;
`;

export default SuccessButton;
