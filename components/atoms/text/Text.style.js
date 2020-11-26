import styled from "styled-components";

const TextPrimitive = function ({component, className, style, center, lines, noMarginBottom, children}) {
  if (component == null) component = "p";
  const Component = `${component}`;
  return (
    <Component style={style} className={className}>
      {children}
    </Component>
  );
};

export const StyledText = styled(TextPrimitive)`
  margin-top: 0;
  ${(props) => props.center && "text-align: center;"}
  ${(props) => props.lines && "display: -webkit-box; -webkit-line-clamp: " + props.lines + "; -webkit-box-orient: vertical; overflow: hidden;"}
  ${(props) => props.noMarginBottom && "margin-bottom:0;"}
`;
