import {Grid} from "@material-ui/core";
import IconButton from "~/components/atoms/iconButton/IconButton";
import Select from "~/components/atoms/Select/Select";
import TextField from "~/components/atoms/textfield/Textfield";
import TextBlock from "../../textBlock/TextBlock";

const SwitchComponent = function ({switchCase, ...props}) {
  const handleChange = (e) => {
    props.onUpdate(e, props.index);
  };

  return (
    <>
      <Grid item xs={2}>
        <Select
          label="Condition"
          name="condition"
          value={switchCase.condition}
          onChange={handleChange}
          items={[
            {label: "is gelijk aan", value: "="},
            {label: "niet gelijk is aan", value: "!="},
            {label: "is groter dan", value: ">"},
            {label: "is groter of gelijk aan", value: ">="},
            {label: "is kleiner dan", value: "<"},
            {label: "is kleiner of gelijk aan", value: "<="},
          ]}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField label="Waarde" onChange={handleChange} value={switchCase.value} name="value" />
      </Grid>
      <Grid item xs={8} className="switch-content-wrapper">
        <div className="switch-content">
          <TextBlock parentId={switchCase.id} segment={switchCase.data[0]} />
        </div>
        <IconButton square small icon={["fal", "trash-alt"]} onClick={() => props.onDelete(props.index)} />
      </Grid>
    </>
  );
};

export default SwitchComponent;
