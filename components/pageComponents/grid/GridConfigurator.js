import {Grid} from "@material-ui/core";
import {useEffect, useState} from "react";
import Select from "~/components/atoms/Select/Select";
import TextfieldTitle from "~/components/atoms/textfield/TextfieldTitle";
import TextfieldWithImageSelector from "~/components/atoms/textfield/TextfieldWithImageSelector";
import TextFieldWithTag from "~/components/atoms/textfield/TextFieldWithTag";

const GridConfigurator = function ({component, form, setForm, resetForm, updateForm, ...props}) {
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Select
            label="Grid container"
            onChange={setForm}
            value={form.isContainer}
            name="isContainer"
            items={[
              {label: "Ja", value: true},
              {label: "Nee", value: false},
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
              {label: "Geen", value: 0},
              {label: "Klein", value: 1},
              {label: "Gemiddeld", value: 2},
              {label: "Groot", value: 3},
              {label: "Extra groot", value: 4},
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            label="Ruimte tussen grid cellen"
            onChange={setForm}
            value={form.spacing}
            name="spacing"
            items={[
              {label: "Geen ruimte", value: 0},
              {label: "Klein", value: 1},
              {label: "Gemiddeld", value: 2},
              {label: "Groot", value: 3},
              {label: "Extra groot", value: 4},
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default GridConfigurator;
