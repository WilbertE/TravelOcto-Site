import {Grid} from "@material-ui/core";
import Select from "../Select/Select";
import {StyledTextfieldTitle} from "./TextfieldTitle.style";
import TextFieldWithTag from "./TextFieldWithTag";

const TextfieldTitle = function (props) {
  return (
    <StyledTextfieldTitle>
      <div className="tag-wrapper">
        <Select
          label={props.componentLabel}
          onChange={props.onChange}
          value={props.componentValue}
          name={props.componentName}
          items={[
            {label: "H1", value: "h1"},
            {label: "H2", value: "h2"},
            {label: "H3", value: "h3"},
            {label: "H4", value: "h4"},
            {label: "H5", value: "h5"},
            {label: "H6", value: "h6"},
          ]}
        />
      </div>
      <div className="variant-wrapper">
        <Select
          label={props.variantLabel}
          onChange={props.onChange}
          value={props.variantValue}
          name={props.variantName}
          disabled={props.variantDisabled}
          items={[
            {label: "H1", value: "h1"},
            {label: "H2", value: "h2"},
            {label: "H3", value: "h3"},
            {label: "H4", value: "h4"},
            {label: "H5", value: "h5"},
            {label: "H6", value: "h6"},
          ]}
        />
      </div>
      <div className="title-wrapper">
        <TextFieldWithTag
          label={props.label}
          onChange={props.onChange}
          value={props.value}
          name={props.name}
          tags={props.tags}
          allowed={["string", "integer"]}
        />
      </div>
    </StyledTextfieldTitle>
  );
};

export default TextfieldTitle;
