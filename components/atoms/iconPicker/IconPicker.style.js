import styled from "styled-components";
import IconButton from "../iconButton/IconButton";

const StyledIconPicker = styled(IconButton)`
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 0px;
  border-bottom: solid 1px #949494;
  margin-top: 18px;
  &:after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    border-bottom: solid 2px #212121;
    display: none;
  }
  &:hover:after {
    display: block;
  }
  &::before {
    content: "Icoon";
    display: block;
    color: rgba(0, 0, 0, 0.54);
    padding: 0;
    font-size: 1rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1;
    -webkit-letter-spacing: 0.00938em;
    -moz-letter-spacing: 0.00938em;
    -ms-letter-spacing: 0.00938em;
    letter-spacing: 0.00938em;
    top: -18px;
    left: 0;
    position: absolute;
    -webkit-transform: translate(0, 1.5px) scale(0.75);
    -ms-transform: translate(0, 1.5px) scale(0.75);
    transform: translate(0, 1.5px) scale(0.75);
    -webkit-transform-origin: top left;
    -ms-transform-origin: top left;
    transform-origin: top left;
  }
`;

export {StyledIconPicker};
