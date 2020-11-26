import StyledLoadingIndicator from "./LoadingIndicator.style";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function LoadingIndicator(props) {
  return (
    <StyledLoadingIndicator className="indicator-overlay" {...props}>
      <CircularProgress className="indicator" {...props} />
    </StyledLoadingIndicator>
  );
}
