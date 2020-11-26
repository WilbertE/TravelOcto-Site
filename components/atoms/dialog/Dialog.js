const {StyledDialog} = require("./Dialog.style");
const {DialogTitle} = require("@material-ui/core");
const {default: IconButton} = require("../iconButton/IconButton");

const Dialog = function (props) {
  const disableCloseButton = props.disableCloseButton != null ? props.disableCloseButton : false;
  return (
    <StyledDialog {...props}>
      {disableCloseButton == false && <IconButton className="close-button" icon={["fal", "times"]} onClick={props.onClose} />}
      {props.title && <DialogTitle className="title">{props.title}</DialogTitle>}
      {props.children}
    </StyledDialog>
  );
};

export default Dialog;
