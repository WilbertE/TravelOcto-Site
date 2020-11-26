import {Grid} from "@material-ui/core";
import {useEffect, useState} from "react";
import Select from "~/components/atoms/Select/Select";
import TextfieldTitle from "~/components/atoms/textfield/TextfieldTitle";
import TextfieldWithImageSelector from "~/components/atoms/textfield/TextfieldWithImageSelector";
import TextFieldWithTag from "~/components/atoms/textfield/TextFieldWithTag";
import useForm from "~/util/form";

const TitleConfigurator = function ({component, form, setForm, resetForm, updateForm, ...props}) {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextfieldTitle
            onChange={setForm}
            value={form.title}
            componentValue={form.titleComponent}
            componentName="titleComponent"
            componentLabel="Tag"
            variantValue={form.titleVariant}
            variantName="titleVariant"
            variantLabel="Visueel"
            label="Titel"
            name="title"
            tags={component.tags.map((t) => t.name)}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            label="Uitlijning"
            onChange={setForm}
            value={form.alignment}
            name="alignment"
            items={[
              {label: "Links", value: "left"},
              {label: "Gecentreerd", value: "center"},
              {label: "Rechts", value: "right"},
            ]}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            label="Onderlijnen"
            onChange={setForm}
            value={form.underline}
            name="underline"
            items={[
              {label: "Ja", value: true},
              {label: "Nee", value: false},
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default TitleConfigurator;
