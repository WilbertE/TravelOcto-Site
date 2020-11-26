import styled from "styled-components";

const StyledTextEditor = styled.div`
  position: relative;

  .editor {
    height: 11em;
    overflow-y: auto;
    overflow-x: hidden;

    .codex-editor__redactor {
      padding-bottom: 0 !important;
    }
  }
  .ce-toolbar__actions,
  .ce-toolbar__plus,
  .ce-inline-tool--link {
    display: none;
  }
  .ce-paragraph {
    height: 9rem;
  }

  .toolbar {
    border-left: none;
    border-right: none;
    display: flex;
    justify-content: flex-end;
    .button {
      color: rgba(0, 0, 0, 0.87);
    }
    .button-save {
      color: green;
    }
    .button-cancel {
      color: red;
    }
  }
`;
export {StyledTextEditor};
