const {StyledDialogContent} = require("./DialogContent.style");

const DialogContent = function (props) {
  return <StyledDialogContent {...props}>{props.children}</StyledDialogContent>;
};

export default DialogContent;
