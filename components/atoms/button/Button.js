import {StyledButton} from "./Button.style";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";
import PropTypes from "prop-types";

export default function Button({disabled, loading, ...props}) {
  disabled = loading ? true : props.disabled;

  return (
    <StyledButton disabled={disabled} {...props}>
      {loading == true && <LoadingIndicator />}
      {props.children}
    </StyledButton>
  );
}

Button.propTypes = {
  loading: PropTypes.bool,
};

Button.defaultProps = {
  variant: "contained",
  loading: false,
};
