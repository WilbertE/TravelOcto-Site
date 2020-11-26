import {Grid} from "@material-ui/core";
import {useRef, useState} from "react";
import VariableSelector from "~/components/organisms/VariableSelector/VariableSelector";
import IconButton from "../iconButton/IconButton";
import Select from "../Select/Select";
import TextField from "./Textfield";
import {StyledTextfieldWithLink} from "./TextfieldWithLink.style";
import TextFieldWithTag from "./TextFieldWithTag";

const TextfieldWithLink = function ({...props}) {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <TextFieldWithTag
            allowed={["string", "integer"]}
            tags={props.tags}
            onChange={props.onChange}
            label={props.label}
            value={props.value}
            name={props.name}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Select
            label={props.linkTargetLabel}
            onChange={props.onChange}
            value={props.linkTargetValue}
            name={props.linkTargetName}
            items={[
              {label: "Zelfde scherm", value: "_self"},
              {label: "Nieuw scherm", value: "_blank"},
            ]}
          />
        </Grid>
        <Grid item xs={7}>
          <TextFieldWithTag
            allowed={["string", "integer"]}
            tags={props.tags}
            onChange={props.onChange}
            label={props.linkTitleLabel}
            value={props.linkTitleValue}
            name={props.linkTitleName}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default TextfieldWithLink;
