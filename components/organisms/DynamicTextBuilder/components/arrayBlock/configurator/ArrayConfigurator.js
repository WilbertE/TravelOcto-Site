import {Grid} from "@material-ui/core";
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import IconButton from "~/components/atoms/iconButton/IconButton";
import Select from "~/components/atoms/Select/Select";
import TextField from "~/components/atoms/textfield/Textfield";
import TextFieldWithTag from "~/components/atoms/textfield/TextFieldWithTag";
import useForm from "~/util/form";
import {segmentState, tagsState} from "../../../atoms";

const {StyledArrayConfigurator} = require("./ArrayConfigurator.style");

const ArrayConfigurator = function (props) {
  const [tags, setTags] = useRecoilState(tagsState);
  const [form, setForm, resetForm, replaceForm] = useForm({
    prefixSingle: "",
    prefixMultiple: "",
    array: "",
    field: "",
    limit: 0,
    sortField: "",
    sortMethod: "",
    divider: "",
    lastDivider: "",
    suffixSingle: "",
    suffixMultiple: "",
  });
  const [updateSegment, setUpdateSegment] = useRecoilState(segmentState);

  useEffect(() => {
    replaceForm({
      prefixSingle: props.segment.data.prefixSingle,
      prefixMultiple: props.segment.data.prefixMultiple,
      array: props.segment.data.array ? props.segment.data.array.replace("{[", "").replace("]}", "") : "",
      field: props.segment.data.field ? props.segment.data.field.replace("{[", "").replace("]}", "") : "",
      limit: props.segment.data.limit,
      sortField: props.segment.data.sortField ? props.segment.data.sortField.replace("{[", "").replace("]}", "") : "",
      sortMethod: props.segment.data.sortMethod,
      divider: props.segment.data.divider,
      lastDivider: props.segment.data.lastDivider,
      suffixSingle: props.segment.data.suffixSingle,
      suffixMultiple: props.segment.data.suffixMultiple,
    });
  }, []);

  useEffect(() => {
    if (form.array == "") return;
    let newSegment = JSON.parse(JSON.stringify(props.segment));
    newSegment.data = {
      prefixSingle: form.prefixSingle,
      prefixMultiple: form.prefixMultiple,
      array: "{[" + form.array + "]}",
      field: "{[" + form.field + "]}",
      limit: form.limit,
      sortField: "{[" + form.sortField + "]}",
      sortMethod: form.sortMethod,
      divider: form.divider,
      lastDivider: form.lastDivider,
      suffixSingle: form.suffixSingle,
      suffixMultiple: form.suffixMultiple,
    };
    setUpdateSegment(newSegment);
  }, [form]);

  return (
    <StyledArrayConfigurator>
      <Grid container spacing={2}>
        <Grid item xs={form.array == "" ? 12 : 6}>
          <div className="input-wrapper">
            <TextFieldWithTag mustSelectTag onChange={setForm} value={form.array} label="Variabele" name="array" tags={tags} allowed={["array"]} />
          </div>
        </Grid>
        {form.array != "" && (
          <>
            <Grid item xs={6}>
              <div className="input-wrapper">
                <TextFieldWithTag
                  mustSelectTag
                  onChange={setForm}
                  value={form.field}
                  label="Veld"
                  name="field"
                  tags={[form.array.replace("{", "").replace("}", "") + "[]"]}
                  allowed={["string", "number"]}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="input-wrapper">
                <TextFieldWithTag
                  mustSelectTag
                  onChange={setForm}
                  value={form.sortField}
                  label="Sorteren op veld"
                  name="sortField"
                  tags={[form.array.replace("{", "").replace("}", "") + "[]"]}
                  allowed={["string", "number"]}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="input-wrapper">
                <Select
                  label="Sorteer volgorde"
                  onChange={setForm}
                  value={form.sortMethod}
                  name="sortMethod"
                  items={[
                    {label: "Oplopend", value: "asc"},
                    {label: "Aflopend", value: "desc"},
                  ]}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="input-wrapper">
                <TextField onChange={setForm} value={form.limit} label="Limiet" name="limit" type="number" />
              </div>
            </Grid>
          </>
        )}
        <Grid item xs={6}>
          <div className="input-wrapper">
            <TextField onChange={setForm} value={form.prefixSingle} label="Voorvoegsel 1 item" name="prefixSingle" />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="input-wrapper">
            <TextField onChange={setForm} value={form.prefixMultiple} label="Voorvoegsel meerdere items" name="prefixMultiple" />
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="input-wrapper">
            <TextField onChange={setForm} value={form.divider} label="Scheidingsteken" name="divider" />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="input-wrapper">
            <TextField onChange={setForm} value={form.lastDivider} label="Laatste scheidingsteken" name="lastDivider" />
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="input-wrapper">
            <TextField onChange={setForm} value={form.suffixSingle} label="Achtervoegsel 1 item" name="suffixSingle" />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="input-wrapper">
            <TextField onChange={setForm} value={form.suffixMultiple} label="Achtervoegsel meerdere items" name="suffixMultiple" />
          </div>
        </Grid>
      </Grid>
      <div className="tools">
        <div></div>
        <div>
          <IconButton className="configButton save" onClick={props.onClose} icon={["fal", "check"]} square small />
        </div>
      </div>
    </StyledArrayConfigurator>
  );
};

export default ArrayConfigurator;
