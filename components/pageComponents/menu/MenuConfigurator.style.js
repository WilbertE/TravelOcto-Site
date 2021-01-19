import styled from "styled-components";

const StyledMenuConfigurator = styled.div`
  .divider {
    border-bottom: solid 1px #e0e0e0;
  }

  .delete-column {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .name-wrapper {
    margin-bottom: 16px;
  }

  .no-menu-loaded {
    margin-top: 48px;
    text-align: center;
  }

  .add-menu-item {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 8px 0 12px;
    cursor: pointer;
    opacity: 0.2;
    transition: opacity 0.15s ease-in-out;
    &:hover {
      opacity: 1;
    }

    .add-menu-icon {
      background: #fff;
      border-radius: 50%;
      padding: 8px;
      border: solid 1px #b8b8b8;
      width: 14px;
      height: 14px;
      padding: 4px;
      z-index: 2;
    }

    &::before {
      z-index: 1;
      content: "";
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      border-bottom: solid 1px #b8b8b8;
      top: 50%;
    }
  }
`;

export {StyledMenuConfigurator};
