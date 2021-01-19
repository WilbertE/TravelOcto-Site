import {Grid} from "@material-ui/core";
import {useEffect, useState} from "react";
import Select from "~/components/atoms/Select/Select";
import TextField from "~/components/atoms/textfield/Textfield";
import TextfieldTitle from "~/components/atoms/textfield/TextfieldTitle";
import TextfieldWithImageSelector from "~/components/atoms/textfield/TextfieldWithImageSelector";
import TextfieldWithLink from "~/components/atoms/textfield/TextfieldWithLink";
import TextFieldWithTag from "~/components/atoms/textfield/TextFieldWithTag";
import useForm from "~/util/form";

const TabsConfigurator = function ({component, form, setForm, resetForm, updateForm, ...props}) {
  const [arrayTag, setArrayTag] = useState(null);
  console.log(form);
  useEffect(() => {
    if (form.array == "" || form.array == null) {
      setArrayTag(null);
      return;
    }
    const regex = new RegExp("{([^}]*?)}", "g");
    const rawArray = regex.exec(form.array)[1];
    setArrayTag([rawArray + "[]"]);
  }, [form.array]);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Select
            label="Weergeven bij één item"
            onChange={setForm}
            value={form.showWithOneItem}
            name="showWithOneItem"
            items={[
              {label: "Ja", value: true},
              {label: "Nee", value: false},
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldWithTag
            mustSelectTag
            onChange={setForm}
            value={form.array}
            label="Array"
            name="array"
            tags={component.tags.map((t) => t.name)}
            allowed={["array"]}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldWithTag onChange={setForm} value={form.title} label="Titel" name="title" tags={arrayTag} allowed={["string", "number"]} />
        </Grid>
      </Grid>
    </>
  );
};

export default TabsConfigurator;
