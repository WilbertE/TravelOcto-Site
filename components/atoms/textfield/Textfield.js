import {StyledFormControl, StyledTextBox} from "./Textfield.style";
import PropTypes from "prop-types";
import {InputLabel, Input, InputAdornment, TextareaAutosize} from "@material-ui/core";
import MuiTextField from "@material-ui/core/TextField";

export default function TextField({label, className, endAdornment, startAdornment, inputRef, ...props}) {
  if (props.multiline) {
    return (
      <StyledTextBox ref={inputRef}>
        {endAdornment && (
          <InputAdornment className="adornment-button" position="end">
            {endAdornment}
          </InputAdornment>
        )}
        <MuiTextField className={"textarea " + className} multiline label={label} {...props} />
      </StyledTextBox>
    );
  } else {
    return (
      <StyledFormControl ref={inputRef} {...props}>
        <InputLabel htmlFor={props.id}>{label}</InputLabel>
        {props.multiline == null && (
          <Input
            {...props}
            className={className}
            autoComplete="off"
            endAdornment={endAdornment && <InputAdornment position="end">{endAdornment}</InputAdornment>}
            startAdornment={startAdornment && <InputAdornment position="start">{startAdornment}</InputAdornment>}
          />
        )}
      </StyledFormControl>
    );
  }
}
