import {Grid} from "@material-ui/core";
import TextFieldWithTag from "~/components/atoms/textfield/TextFieldWithTag";

const CurrencyRateTableConfigurator = function ({component, form, setForm, resetForm, updateForm, ...props}) {
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <TextFieldWithTag
            label="Valuta symbool"
            onChange={setForm}
            value={form.currencySymbol}
            name="currencySymbol"
            tags={component.tags.map((t) => t.name)}
            allowed={["string"]}
            mustSelectTag
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldWithTag
            label="Koers"
            onChange={setForm}
            value={form.conversionRate}
            name="conversionRate"
            tags={component.tags.map((t) => t.name)}
            allowed={["number"]}
            mustSelectTag
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CurrencyRateTableConfigurator;
