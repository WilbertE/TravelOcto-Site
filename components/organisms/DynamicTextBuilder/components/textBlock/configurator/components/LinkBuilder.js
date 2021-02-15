import {StyledLinkBuilder} from "./LinkBuilder.style";
import DialogContent from "~/components/atoms/dialog/DialogContent";
import {Checkbox, FormControlLabel, Grid} from "@material-ui/core";
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
  const [form, setForm, resetForm, updateForm] = useForm({
    url: "",
    target: "_self",
    text: "",
    sponsored: false,
    noopener: false,
    author: false,
    noreferrer: false,
    noopener: false,
    ugc: false,
  });
  const [tags, setTags] = useRecoilState(tagsState);

  useEffect(() => {
    let regex = new RegExp("(\\[a\\ target='((?!').*?)' (rel='((?!').*?)'\\ |)href='((?!').*?)'\\]((?!\\[\\/a\\]).*?)\\[\\/a\\])", "gi");
    var match = regex.exec(props.selection);
    console.log(match);
    if (match != null) {
      var rel = match[4] || "";
      updateForm({
        url: match[5],
        target: match[2],
        text: match[6],
        sponsored: rel.indexOf("sponsored") > -1,
        noopener: rel.indexOf("noopener") > -1,
        author: rel.indexOf("author") > -1,
        noreferrer: rel.indexOf("noreferrer") > -1,
        nofollow: rel.indexOf("nofollow") > -1,
        ugc: rel.indexOf("ugc") > -1,
      });
    }
  }, [props.selection]);

  const handleInsertLink = () => {
    var rel = [];
    if (form.sponsored) rel.push("sponsored");
    if (form.noopener) rel.push("noopener");
    if (form.author) rel.push("author");
    if (form.noreferrer) rel.push("noreferrer");
    if (form.ugc) rel.push("ugc");
    if (form.nofollow) rel.push("nofollow");

    const linkTag = "[a target='" + form.target + "' rel='" + rel.join(" ") + "' href='" + form.url + "']" + form.text + "[/a]";
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
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox value={form.sponsored} checked={form.sponsored} onChange={setForm} name="sponsored" />}
                  label="Gesponsord"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox value={form.noreferrer} checked={form.noreferrer} onChange={setForm} name="noreferrer" />}
                  label="No Referrer"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel control={<Checkbox value={form.noopener} checked={form.noopener} onChange={setForm} name="noopener" />} label="No Opener" />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel control={<Checkbox value={form.nofollow} checked={form.nofollow} onChange={setForm} name="nofollow" />} label="No Follow" />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel control={<Checkbox value={form.author} checked={form.author} onChange={setForm} name="author" />} label="Auteur" />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel control={<Checkbox value={form.ugc} checked={form.ugc} onChange={setForm} name="ugc" />} label="User Generated" />
              </Grid>
            </Grid>
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
