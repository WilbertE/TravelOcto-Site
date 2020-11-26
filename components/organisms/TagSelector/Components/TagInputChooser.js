import {StyledTagInputChooser} from "./TagInputChooser.style";
import {DialogContent, ListItem} from "@material-ui/core";
import Select from "~/components/atoms/Select/Select";
import useForm from "~/util/form";
import Text from "~/components/atoms/text/Text";
import DialogActions from "~/components/atoms/dialog/DialogAction";
import Button from "~/components/atoms/button/Button";
import TextField from "~/components/atoms/textfield/Textfield";
import MessageboxStoreManager from "~/components/molecules/Messagebox/MessageboxFactory";
import {messageboxState} from "~/components/molecules/Messagebox/MessageboxAtom";
import {useRecoilState} from "recoil";

const TagInputChooser = function ({data, ...props}) {
  const messageboxStateAtom = useRecoilState(messageboxState);
  const [form, setForm] = useForm({input: "", customInput: ""});

  const handleSourceSelect = () => {
    if (form.input.indexOf("custom [") > -1 && form.customInput == "" || form.input == "") {
      MessageboxStoreManager.AddMessage(messageboxStateAtom, {title: "Oops", content: "Vul een vaste waarde in die als invoer dient om de bron te laden"});
      return;
    }
    props.onSelect(data.tag.name, form.input, form.customInput);
    props.onClose();
  };

  return (
    <StyledTagInputChooser open={true} title={data.tag.name} onClose={props.onClose}>
      <DialogContent className="DialogContent">
        <Select
          label={"Invoer voor " + data.tag.name}
          value={form.input}
          onChange={setForm}
          name="input"
          items={data.inputs.map((input) => {
            return {label: input.indexOf("custom [") == -1 ? input : "custom", value: input};
          })}
        />
        {form.input.indexOf("custom [") > -1 && (
          <TextField
            value={form.customInput}
            onChange={setForm}
            label={"Vaste waarde: " + form.input.replace("custom [", "").replace("]", "")}
            name="customInput"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSourceSelect}>Toevoegen</Button>
      </DialogActions>
    </StyledTagInputChooser>
  );
};

export default TagInputChooser;
