import {Grid} from "@material-ui/core";
import {useEffect, useState} from "react";
import Select from "~/components/atoms/Select/Select";
import TextfieldTitle from "~/components/atoms/textfield/TextfieldTitle";
import TextfieldWithImageSelector from "~/components/atoms/textfield/TextfieldWithImageSelector";
import TextFieldWithTag from "~/components/atoms/textfield/TextFieldWithTag";

const GridCellConfigurator = function ({component, form, setForm, resetForm, updateForm, ...props}) {
  var options = [
    [form.sizeXs, "sizeXs", "mobiel"],
    [form.sizeSm, "sizeSm", "tablet"],
    [form.sizeMd, "sizeMd", "laptop"],
    [form.sizeLg, "sizeLg", "kleine monitor"],
    [form.sizeXl, "sizeXl", "grote monitor"],
  ];

  return (
    <div>
      <Grid container>
        {options.map((option, key) => {
          return (
            <Grid key={key} item xs={12}>
              <Select
                label={`Grootte op ${option[2]}`}
                onChange={setForm}
                value={option[0]}
                name={option[1]}
                items={[
                  {label: "1", value: 1},
                  {label: "2", value: 2},
                  {label: "3 (4 cellen per rij)", value: 3},
                  {label: "4 (3 cellen per rij)", value: 4},
                  {label: "5", value: 5},
                  {label: "6 (2 cellen per rij)", value: 6},
                  {label: "7", value: 7},
                  {label: "8", value: 8},
                  {label: "9", value: 9},
                  {label: "10", value: 10},
                  {label: "11", value: 11},
                  {label: "12 (1 cel per rij)", value: 12},
                ]}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default GridCellConfigurator;
