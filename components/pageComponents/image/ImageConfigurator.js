import {Grid} from "@material-ui/core";
import {useEffect, useState} from "react";
import Select from "~/components/atoms/Select/Select";
import TextfieldTitle from "~/components/atoms/textfield/TextfieldTitle";
import TextfieldWithImageSelector from "~/components/atoms/textfield/TextfieldWithImageSelector";
import Textfield from "~/components/atoms/textfield/Textfield";
import TextFieldWithTag from "~/components/atoms/textfield/TextFieldWithTag";
import useForm from "~/util/form";

const ImageConfigurator = function ({component, form, setForm, resetForm, updateForm, ...props}) {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextfieldWithImageSelector
            onChange={setForm}
            value={form.image}
            label="Afbeelding"
            name="image"
            altValue={form.imageAlt}
            altName="imageAlt"
            altLabel="Alt omschrijving"
            tags={component.tags.map((t) => t.name)}
          />
        </Grid>
        <Grid item xs={6}>
          <Textfield type="number" label={"maximale hoogte (0 = onbeperkt)"} onChange={setForm} value={form.maxHeight} name="maxHeight" />
        </Grid>
        <Grid item xs={6}>
          <Textfield type="number" label={"maximale breedte (0 = onbeperkt)"} onChange={setForm} value={form.maxWidth} name="maxWidth" />
        </Grid>
        <Grid item xs={12}>
          <Select
            label="Weergave"
            onChange={setForm}
            value={form.backgroundSize}
            name="backgroundSize"
            items={[
              {label: "Geheel", value: "contain"},
              {label: "Dekkend", value: "cover"},
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldWithTag
            label="Onderschrift"
            onChange={setForm}
            value={form.description}
            name="description"
            tags={component.tags.map((t) => t.name)}
            allowed={["string", "integer"]}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ImageConfigurator;
