import styled from "styled-components";
import Title from "~/components/atoms/title/Title";

const TitlePrimitive = function ({alignment, underline, ...props}) {
  return <Title {...props}>{props.children}</Title>;
};

const StyledTitle = styled(TitlePrimitive)`
  ${(props) => props.alignment != "left" && `text-align: ${props.alignment};`}
  ${(props) =>
    props.underline &&
    `
      padding: 0 0 2rem 0px;
      &:after{
        display: block;
        content: "";
        width: 50px;
        border-bottom: 2px solid #323E7A;
        position: relative;
        top: 0.75rem;
    }`}
    ${(props) => props.alignment == "center" && `&:after{margin: 0px auto;}`}
    ${(props) => props.alignment == "right" && `&:after{margin: 0px 0px 0px auto;}`}
    ${(props) => props.variant == "h3" && `color:#0A5A87;`}

    @media screen and (min-width:960px) {
    &:after {
      top: 1rem;
    }
  }

  @media screen and (min-width: 1280px) {
    &:after {
      top: 1rem;
    }
  }
`;

export {StyledTitle};
