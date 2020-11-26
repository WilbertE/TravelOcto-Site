import styled from "styled-components";

const StyledGridCollectionCellConfigurator = styled.div`
  .filter-title {
    margin-top: 32px;
  }

  .filter-when-column,
  .filter-remove-column {
    display: flex;
    align-items: center;
  }

  .filter-remove-column {
    justify-content: center;
  }

  .filter-group-wrapper {
    &:after {
      display: inline-block;
      content: "OF";
      background: #debdbd;
      font-size: 0.65rem;
      line-height: 1rem;
      border-radius: 3px;
      padding: 0 4px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 4px;
      margin-top: -12px;
    }
  }

  .filter-group {
    &:after {
      display: inline-block;
      content: "EN";
      background: #bdcede;
      font-size: 0.65rem;
      line-height: 1rem;
      border-radius: 3px;
      padding: 0 4px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 4px;
      margin-top: -12px;
    }
    &:last-child:after {
      display: none;
    }
  }

  .add-filter-button {
    position: relative;
    text-align: center;
    &:before {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      border-top: solid 1px #e0e0e0;
    }
    .add-button {
      background: #fff;
      border: solid 1px #e0e0e0;
      &:hover {
        background-color: #e0e0e0;
      }
    }
  }
`;

export {StyledGridCollectionCellConfigurator};
