const {StyledDialog} = require("./Dialog.style");
const {DialogTitle} = require("@material-ui/core");
const {default: IconButton} = require("../iconButton/IconButton");

const Dialog = function ({additionalButtons, ...props}) {
  const disableCloseButton = props.disableCloseButton != null ? props.disableCloseButton : false;
  return (
    <StyledDialog {...props}>
      <div className="dialog-head">
        {props.title && <DialogTitle className="title">{props.title}</DialogTitle>}
        <div>
          {additionalButtons}
          {disableCloseButton == false && <IconButton className="close-button" icon={["fal", "times"]} onClick={props.onClose} />}
        </div>
      </div>
      {props.children}
    </StyledDialog>
  );
};

export default Dialog;
