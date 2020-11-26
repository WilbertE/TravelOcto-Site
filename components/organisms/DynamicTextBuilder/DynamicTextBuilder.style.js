import styled from "styled-components";
import Dialog from "~/components/atoms/dialog/Dialog";

const StyledDynamicTextBuilder = styled.div`
  margin-bottom: 16px;
  .header-title {
    color: rgba(0, 0, 0, 0.54);
    padding: 0;
    font-size: 1rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.00938em;
    transform: translate(0, 1.5px) scale(0.75);
    transform-origin: top left;
    margin-bottom: 16px;
  }

  a {
    pointer-events: none;
  }
`;

export {StyledDynamicTextBuilder};
