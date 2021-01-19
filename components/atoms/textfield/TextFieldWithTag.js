import {useRef, useState} from "react";
import VariableSelector from "~/components/organisms/VariableSelector/VariableSelector";
import IconButton from "../iconButton/IconButton";
import TextField from "./Textfield";

const TextFieldWithTag = function ({allowed, mustSelectTag, isArraySelector, ...props}) {
  const [showVariableDialog, setShowVariableDialog] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);
  const textFieldRef = useRef(null);

  const toggleVariableDialog = () => setShowVariableDialog(!showVariableDialog);

  const getInputFromRef = () => {
    let input = textFieldRef.current.querySelector("input");
    if (input == null) input = textFieldRef.current.querySelector("textarea");
    return input;
  };

  const handleOpenVariableDialog = () => {
    var input = getInputFromRef();
    setCaretPosition(input.selectionStart);
    toggleVariableDialog();
  };

  const handleVariableSelect = (variableName) => {
    console.log(props.value);
    props.onChange({
      target: {
        name: props.name,
        value:
          mustSelectTag == null || mustSelectTag == false
            ? props.value.slice(0, caretPosition) + "{" + variableName + "}" + props.value.slice(caretPosition)
            : "{" + variableName + "}",
      },
    });
    toggleVariableDialog();
  };

  return (
    <>
      <TextField
        {...props}
        readOnly={mustSelectTag}
        inputRef={textFieldRef}
        onClick={mustSelectTag ? handleOpenVariableDialog : null}
        endAdornment={<IconButton icon={["fal", "tag"]} onClick={handleOpenVariableDialog} />}
      />
      {showVariableDialog && <VariableSelector allowed={allowed} tags={props.tags} onSelect={handleVariableSelect} onClose={toggleVariableDialog} />}
    </>
  );
};

export default TextFieldWithTag;
