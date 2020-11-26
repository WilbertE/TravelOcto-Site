import styled from "styled-components";

const StyledTagExpander = styled.div`
  border: dashed 1px #b8b8b8;
  border-radius: 5px;
  padding: 5px;
  position: relative;
  padding-top: 8px;
  margin-top: 24px;

  .tagexpander-head {
    position: absolute;
    top: -15px;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover .add-tag,
    &:hover .delete-tag {
      opacity: 1;
      pointer-events: all;
    }

    .tagexpander {
      font-size: 0.8em;
      background-color: #00941e;
      color: #fff;
      padding: 0px 8px;
      border-radius: 5px;
      margin: 0 4px;
    }

    .add-tag,
    .delete-tag {
      margin: 0 4px;

      position: relative;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.5s ease;
    }
  }
  .tagexpander-content {
    padding: 5px;
  }
`;

export {StyledTagExpander};
