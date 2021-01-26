import {Input, InputAdornment} from "@material-ui/core";
import {useState} from "react";
import Button from "~/components/atoms/button/Button";
import IconButton from "~/components/atoms/iconButton/IconButton";
import TextField from "~/components/atoms/textfield/Textfield";
import useForm from "~/util/form";
import Configurable from "../Configurable";
import {StyledCurrencyConverter} from "./CurrencyConverter.style";
import CurrencyConverterConfigurator from "./CurrencyConverterConfigurator";

const CurrencyConverter = function (props) {
  if (props.liveMode == false) {
    return (
      <>
        <Configurable component={props.component} preview={false} title="Koers berekening" configurator={<CurrencyConverterConfigurator />}>
          <Component {...props} />
        </Configurable>
      </>
    );
  } else {
    return <Component {...props} />;
  }
};

const Component = function ({component, ...props}) {
  const round = (input) => {
    if (input < 1000) return String(input.toFixed(2)).replace(".", ",");
    return (
      Math.round(input)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ",-"
    );
  };

  const data = component.data;
  const [reverse, setReverse] = useState(false);
  const [form, setForm] = useState({
    base: "EUR",
    baseValue: 25,
    baseSymbol: "€",
    currency: props.liveMode == false ? "THB" : data.currencyIso,
    currencySymbol: props.liveMode == false ? "฿" : data.currencySymbol,
    currencyValue: props.liveMode == false ? "461" : round(25 * data.conversionRate),
    rate: props.liveMode == false ? 1 : data.conversionRate,
  });

  const handleBaseChange = (e) => {
    try {
      var value = String(e.target.value);
      if (isNaN(value)) value = 0;
      var converted = value * form.rate;
      if (isNaN(converted)) converted = 0;
      setForm({...form, currencyValue: round(converted), baseValue: value});
    } catch (z) {}
  };

  const handleCurrencyChange = (e) => {
    try {
      var value = parseFloat(e.target.value);
      if (isNaN(value)) value = 0;
      var converted = value / form.rate;
      if (isNaN(converted)) converted = 0;
      setForm({...form, currencyValue: value, baseValue: round(converted)});
    } catch (z) {}
  };

  const clearBase = () => {
    setForm({...form, baseValue: ""});
  };
  const clearCurrency = () => {
    setForm({...form, currencyValue: ""});
  };

  return (
    <StyledCurrencyConverter reverse={reverse}>
      <TextField
        disabled={props.liveMode == false}
        label={form.base}
        name="base"
        onFocus={clearBase}
        onChange={handleBaseChange}
        value={form.baseValue}
        startAdornment={form.baseSymbol}
      />
      <IconButton disabled={props.liveMode == false} onClick={() => setReverse(!reverse)} className="button" icon={["fal", "exchange"]} square />
      <TextField
        disabled={props.liveMode == false}
        label={form.currency}
        name="currency"
        onFocus={clearCurrency}
        onChange={handleCurrencyChange}
        value={form.currencyValue}
        startAdornment={form.currencySymbol}
      />
    </StyledCurrencyConverter>
  );
};

export default CurrencyConverter;
