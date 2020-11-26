import styled from "styled-components";
import Text from "~/components/atoms/text/Text";

const DynamicTextPrimitive = function ({tag, ...props}) {
  return <Text {...props}>{props.children}</Text>;
};

const StyledDynamicText = styled(DynamicTextPrimitive)``;

export {StyledDynamicText};
