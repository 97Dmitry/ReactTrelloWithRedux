import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";

const DeleteButton = styled(IconButton)`
  padding: 0 !important;
  &:hover {
    color: red !important;
    background: none !important;
  }
`;

export default DeleteButton;
