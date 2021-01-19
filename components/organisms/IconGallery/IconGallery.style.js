import styled from "styled-components";
import Dialog from "~/components/atoms/dialog/Dialog";

const StyledIconGallery = styled(Dialog)`
  .icon-collection {
    display: flex;
    margin: -4px;
    flex-wrap: wrap;
    .icon-button {
      border-radius: 3px;
      margin: 4px;
      width: 42px;
      height: 42px;
      border: solid 1px #e0e0e0;
    }
  }
`;

export {StyledIconGallery};
