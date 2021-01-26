import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Input, InputAdornment} from "@material-ui/core";
import {useState} from "react";
import Button from "~/components/atoms/button/Button";
import IconButton from "~/components/atoms/iconButton/IconButton";
import TextField from "~/components/atoms/textfield/Textfield";
import useForm from "~/util/form";
import Configurable from "../Configurable";
import {StyledCurrencyRateTable} from "./CurrencyRateTable.style";
import CurrencyRateTableConfigurator from "./CurrencyRateTableConfigurator";

const CurrencyRateTable = function (props) {
  if (props.liveMode == false) {
    return (
      <>
        <Configurable component={props.component} preview={false} title="Koers tabel" configurator={<CurrencyRateTableConfigurator />}>
          <Component {...props} />
        </Configurable>
      </>
    );
  } else {
    return <Component {...props} />;
  }
};

const Component = function ({component, ...props}) {
  var data = component.data;

  const round = (input) => {
    input = parseFloat(input);
    if (input < 1000) return String(input.toFixed(2)).replace(".", ",");
    return (
      Math.round(input)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ",-"
    );
  };

  return (
    <StyledCurrencyRateTable>
      {[1, 2.5, 5, 10, 25, 50, 75, 100].map((base, index) => {
        return (
          <div className="row" key={index}>
            <div className="eur">€ {round(base)}</div>
            <div className="icon">
              <FontAwesomeIcon icon={["fal", "exchange"]} />
            </div>
            {!isNaN(data.conversionRate + 1) && (
              <div className="value">
                {data.currencySymbol} {round(base * data.conversionRate)}
              </div>
            )}
            {isNaN(data.conversionRate + 1) && <div className="value">₿ 1.000.000</div>}
          </div>
        );
      })}
    </StyledCurrencyRateTable>
  );
};

export default CurrencyRateTable;
