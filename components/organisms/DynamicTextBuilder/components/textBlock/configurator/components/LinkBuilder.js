import {StyledLinkBuilder} from "./LinkBuilder.style";
import DialogContent from "~/components/atoms/dialog/DialogContent";
import {Grid} from "@material-ui/core";
import {useRecoilState} from "recoil";
import {tagsState} from "../../../../atoms";
import TextField from "~/components/atoms/textfield/Textfield";
import Select from "~/components/atoms/Select/Select";
import useForm from "~/util/form";
import DialogActions from "~/components/atoms/dialog/DialogAction";
import Button from "~/components/atoms/button/Button";
import {useEffect} from "react";
import TextFieldWithTag from "~/components/atoms/textfield/TextFieldWithTag";

const LinkBuilder = function ({data, ...props}) {
  const [form, setForm, resetForm, updateForm] = useForm({url: "", target: "_self", text: ""});
  const [tags, setTags] = useRecoilState(tagsState);

  useEffect(() => {
    let regex = new RegExp("(\\[a\\ target='((?!').*?)' href='((?!').*?)'\\]((?!\\[\\/a\\]).*?)\\[\\/a\\])", "gi");
    var match = regex.exec(props.selection);
    if (match != null) {
      updateForm({url: match[3], target: match[2], text: match[4]});
    }
  }, [props.selection]);

  const handleInsertLink = () => {
    const linkTag = "[a target='" + form.target + "' href='" + form.url + "']" + form.text + "[/a]";
    props.insertLink(linkTag);
    props.onClose();
  };

  return (
    <StyledLinkBuilder onClose={props.onClose} title="Link aanmaken" open={true} disableBackdropClick={true}>
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <TextFieldWithTag value={form.url} onChange={setForm} label="Url" name="url" tags={tags} allowed={["string", "number"]} />
          </Grid>
          <Grid item xs={12}>
            <Select
              label="target"
              name="target"
              value={form.target}
              onChange={setForm}
              items={[
                {label: "Openen op dezelfde pagina", value: "_self"},
                {label: "Openen op nieuwe pagina", value: "_blank"},
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldWithTag value={form.text} onChange={setForm} label="Weer te geven tekst" name="text" tags={tags} allowed={["string", "number"]} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleInsertLink}>Link invoegen</Button>
      </DialogActions>
    </StyledLinkBuilder>
  );
};

export default LinkBuilder;
