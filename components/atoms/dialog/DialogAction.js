const {StyledDialogActions} = require("./DialogAction.style");

const DialogActions = function (props) {
  return <StyledDialogActions {...props}>{props.children}</StyledDialogActions>;
};

export default DialogActions;
