import {Grid} from "@material-ui/core";
import {useEffect, useState} from "react";
import Button from "~/components/atoms/button/Button";
import Select from "~/components/atoms/Select/Select";
import TextField from "~/components/atoms/textfield/Textfield";
import TextfieldTitle from "~/components/atoms/textfield/TextfieldTitle";
import TextfieldWithImageSelector from "~/components/atoms/textfield/TextfieldWithImageSelector";
import TextfieldWithLink from "~/components/atoms/textfield/TextfieldWithLink";
import TextFieldWithTag from "~/components/atoms/textfield/TextFieldWithTag";
import DynamicTextBuilder from "~/components/organisms/DynamicTextBuilder/DynamicTextBuilder";
import useForm from "~/util/form";

const ParagraphConfigurator = function ({component, form, setForm, resetForm, updateForm, ...props}) {
  const [showDynamicTextBuilderDialog, setShowDynamicTextBuilderDialog] = useState(false);
  const toggleDynamicTextBuilderDialog = () => setShowDynamicTextBuilderDialog(!showDynamicTextBuilderDialog);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Select
            label="Tekst variant"
            onChange={setForm}
            value={form.renderDynamicText}
            name="renderDynamicText"
            items={[
              {label: "Statische tekst", value: false},
              {label: "Dynamische tekst", value: true},
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            label="Marge aan onderkant"
            onChange={setForm}
            value={form.bottomMargin}
            name="bottomMargin"
            items={[
              {label: "Ja", value: true},
              {label: "Nee", value: false},
            ]}
          />
        </Grid>
        {!form.renderDynamicText && (
          <Grid item xs={12}>
            <TextFieldWithTag
              onChange={setForm}
              value={form.staticText}
              multiline
              rows={10}
              rowsMax={20}
              label="Tekst"
              name="staticText"
              allowed={["string", "integer"]}
              tags={component.tags.map((t) => t.name)}
            />
          </Grid>
        )}
        {form.renderDynamicText && (
          <>
            <Grid item xs={12}>
              <DynamicTextBuilder onChange={setForm} name="dynamicText" componentData={form.dynamicText} tags={component.tags.map((t) => t.name)} />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default ParagraphConfigurator;
