import {Grid} from "@material-ui/core";
import {useEffect, useState} from "react";
import Select from "~/components/atoms/Select/Select";
import TextfieldTitle from "~/components/atoms/textfield/TextfieldTitle";
import TextfieldWithImageSelector from "~/components/atoms/textfield/TextfieldWithImageSelector";
import TextFieldWithTag from "~/components/atoms/textfield/TextFieldWithTag";
import useForm from "~/util/form";
import {StyledHeaderConfigurator} from "./HeaderConfigurator.style";

const HeaderConfigurator = function ({component, form, setForm, resetForm, updateForm, ...props}) {
  return (
    <StyledHeaderConfigurator>
      <Grid container>
        <Grid item xs={12}>
          <Select
            label="Grootte"
            onChange={setForm}
            value={form.height}
            name="height"
            items={[
              {label: "Klein", value: "small"},
              {label: "Gemiddeld", value: "medium"},
              {label: "Groot", value: "large"},
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <TextfieldWithImageSelector
            onChange={setForm}
            value={form.backgroundImage}
            label="Achtergrond afbeelding"
            name="backgroundImage"
            altValue={form.backgroundImageAlt}
            altName="backgroundImageAlt"
            altLabel="Alt omschrijving"
            tags={component.tags.map((t) => t.name)}
          />
        </Grid>
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
        <Grid item xs={12}>
          <TextfieldTitle
            onChange={setForm}
            value={form.subtitle}
            componentValue={form.subtitleComponent}
            componentName="subtitleComponent"
            componentLabel="Tag"
            variantValue={form.subtitleVariant}
            variantName="subtitleVariant"
            variantLabel="Visueel"
            label="Titel"
            name="subtitle"
            tags={component.tags.map((t) => t.name)}
          />
        </Grid>
      </Grid>
    </StyledHeaderConfigurator>
  );
};

export default HeaderConfigurator;
