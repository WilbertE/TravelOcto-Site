import styled from "styled-components";

const TitlePrimitive = function ({component, variant, className, children, center, ...props}) {
  const Component = `${component || "h2"}`;
  return <Component className={className}>{children}</Component>;
};

export const StyledTitle = styled(TitlePrimitive)`
  font-family: "Futura PT";
  line-height: 1.25em;
  margin-top: 0;
  margin-bottom: 0.5em;

  ${(props) => (props.variant == "h1" ? "font-size: 2.75rem; " : "")}
  ${(props) => (props.variant == "h2" ? "font-size: 1.75rem; font-weight: 300;" : "")}
  ${(props) => (props.variant == "h3" ? "font-size: 1.75rem; font-weight: 300; margin-bottom:16px;" : "")}
  ${(props) => (props.variant == "h4" ? "font-family: 'Lato',sans-serif; font-size: 1.25rem; font-weight: 300;  color: #323E7A;" : "")}
  ${(props) => (props.variant == "h5" ? "font-family: 'Lato',sans-serif; font-size: 1.1rem; color: #323E7A;" : "")}
  ${(props) => props.center && "text-align: center;"}

  @media screen and (min-width: 960px) {
    ${(props) => (props.variant == "h1" ? "font-size: 3rem; " : "")}
    ${(props) => (props.variant == "h2" ? "font-size: 2rem; " : "")}
    ${(props) => (props.variant == "h3" ? "font-size: 1.85rem; " : "")}
  }

  @media screen and (min-width: 1280px) {
    ${(props) => (props.variant == "h1" ? "font-size: 3.5rem; " : "")}
    ${(props) => (props.variant == "h2" ? "font-size: 2.5rem; " : "")}
    ${(props) => (props.variant == "h3" ? "font-size: 2.25rem; " : "")}
  }

  @media screen and (min-width: 1690px) {
    ${(props) => (props.variant == "h1" ? "font-size: 3.75rem; " : "")}
    ${(props) => (props.variant == "h2" ? "font-size: 2.75rem; " : "")}
    ${(props) => (props.variant == "h3" ? "font-size: 2.5rem; " : "")}
    ${(props) => (props.variant == "h4" ? "font-size: 1.25rem; " : "")}
  }
`;
