import {Chip} from "@material-ui/core";
import {useState} from "react";
import useForm from "~/util/form";
import IconButton from "../iconButton/IconButton";
import TextField from "./Textfield";
import {StyledTextFieldWithChips} from "./TextFieldWithChips.style";

const TextFieldWithChips = function ({tags, ...props}) {
  //   const [tags, setTags] = useState([]);
  const [form, setForm, clearForm, updateForm] = useForm({tag: ""});

  const handleAddTag = (e) => {
    e.preventDefault();
    //setTags((prevState) => [...new Set([...prevState, form.tag])]);

    if (props.onChange) {
      var newTags = [...new Set([...tags, form.tag])];
      props.onChange({target: {name: props.name, value: newTags}});
    }
    clearForm();
  };

  const handleDeleteTag = (tag) => {
    if (props.onChange) {
      var newTags = [...tags.filter((t) => t != tag)];
      props.onChange({target: {name: props.name, value: newTags}});
    }
  };

  return (
    <StyledTextFieldWithChips>
      <div className="chip-wrapper">
        <div className="chip-wrapper-label">{props.label}</div>
        {tags.length == 0 && props.labelEmpty}
        {tags.map((tag, key) => {
          return (
            <Chip
              className="chip"
              key={key}
              label={tag}
              onDelete={() => {
                handleDeleteTag(tag);
              }}
            />
          );
        })}
      </div>
      <form id="chip-form" className="add-chip-form" onSubmit={handleAddTag}>
        <TextField
          onChange={setForm}
          value={form.tag}
          name="tag"
          label={props.textFieldLabel}
          endAdornment={<IconButton onClick={handleAddTag} type="submit" small square icon={["fal", "plus"]} onClick={() => {}} />}
        />
      </form>
    </StyledTextFieldWithChips>
  );
};

export default TextFieldWithChips;
