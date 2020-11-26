import styled from "styled-components";
import IconButton from "~/components/atoms/iconButton/IconButton";

const StyledAddSegmentButton = styled(IconButton)`
  position: relative;
  top: -2px;
  opacity: 0.2;
  margin: 0 -8px;
  transition: opacity 0.25s ease-out, margin 0.25s ease-out;
  &.highlight,
  &:only-child {
    opacity: 1;
    margin: 0 3px;
    color: #323e7a;
  }
  &:hover {
    opacity: 1;
    margin: 0 3px;
  }
`;

export {StyledAddSegmentButton};
