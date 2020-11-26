import {Grid} from "@material-ui/core";
import {useEffect, useState} from "react";
import Select from "~/components/atoms/Select/Select";
import TextField from "~/components/atoms/textfield/Textfield";
import TextfieldTitle from "~/components/atoms/textfield/TextfieldTitle";
import TextfieldWithImageSelector from "~/components/atoms/textfield/TextfieldWithImageSelector";
import TextfieldWithLink from "~/components/atoms/textfield/TextfieldWithLink";
import TextFieldWithTag from "~/components/atoms/textfield/TextFieldWithTag";
import useForm from "~/util/form";

const PhotoCardConfigurator = function ({component, form, setForm, resetForm, updateForm, ...props}) {
  return (
    <>
      <Grid container>
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
        <Grid item xs={12}>
          <TextfieldWithLink
            onChange={setForm}
            value={form.linkHref}
            label="Link"
            name="linkHref"
            linkTargetValue={form.linkTarget}
            linkTargetName="linkTarget"
            linkTargetLabel="Openen in"
            linkTitleValue={form.linkTitle}
            linkTitleName="linkTitle"
            linkTitleLabel="Titel"
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
            variantDisabled
            label="Titel"
            name="title"
            tags={component.tags.map((t) => t.name)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldWithTag
            onChange={setForm}
            value={form.description}
            label="Beschrijving"
            name="description"
            allowed={["string", "integer"]}
            tags={component.tags.map((t) => t.name)}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PhotoCardConfigurator;
