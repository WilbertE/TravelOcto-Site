import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import StyledSelect from "./Select.style";
import MuiSelect from "@material-ui/core/Select";

const Select = function ({label, value, items, inputRef, ...props}) {
  return (
    <StyledSelect {...props}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect value={value} inputRef={inputRef} onChange={props.onChange} name={props.name}>
        {items.map((item, key) => {
          return (
            <MenuItem key={key} value={item.value}>
              {item.label}
            </MenuItem>
          );
        })}
      </MuiSelect>
    </StyledSelect>
  );
};

export default Select;
