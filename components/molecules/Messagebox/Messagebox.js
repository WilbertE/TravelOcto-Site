import React, {useContext} from "react";
import Button from "~/components/atoms/button/Button";
import StyledDialog from "./Messagebox.style";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MessageboxStoreManager from "./MessageboxFactory";
import IconButton from "~/components/atoms/iconButton/IconButton";
import {useRecoilState} from "recoil";
import {messageboxState} from "./MessageboxAtom";

export default function Messagbox({messagebox, ...props}) {
  const messageboxStateAtom = useRecoilState(messageboxState);

  const handleClose = (button) => {
    if (button.onClick != null) button.onClick();
    MessageboxStoreManager.RemoveMessage(messageboxStateAtom, messagebox.id);
  };

  return (
    <StyledDialog title={messagebox.title} open={true} disableBackdropClick={true} onClose={handleClose}>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{messagebox.content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {messagebox.buttons &&
          messagebox.buttons.map((button, key) => {
            return (
              <Button
                variant="text"
                key={key}
                onClick={() => {
                  handleClose(button);
                }}
                color={button.color == null ? "primary" : button.color}>
                {button.label}
              </Button>
            );
          })}
      </DialogActions>
    </StyledDialog>
  );
}
