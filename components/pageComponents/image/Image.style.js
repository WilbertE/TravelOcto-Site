import styled from "styled-components";
import Title from "~/components/atoms/title/Title";

const ImagePrimitive = function ({maxHeight, maxWidth, imageAlt, image, description, backgroundSize, ...props}) {
  return <div {...props}>{props.children}</div>;
};

const StyledImage = styled(ImagePrimitive)`
  /* max-height: ${(props) => (props.maxHeight && props.maxHeight != 0 ? props.maxHeight + "px" : "100%")};
  max-width: ${(props) => (props.maxWidth && props.maxWidth != 0 ? props.maxWidth + "px" : "100%")}; */
  margin-bottom: 32px;

  .image > img {
    display: block;
    max-height: ${(props) => (props.maxHeight && props.maxHeight != 0 ? props.maxHeight + "px" : "100%")};
    max-width: ${(props) => (props.maxWidth && props.maxWidth != 0 ? props.maxWidth + "px" : "100%")};
    object-fit: ${(props) => props.backgroundSize};
    margin-bottom: 8px;
  }
  .description {
    font-style: italic;
    font-size: 0.95em;
    display: block;
    margin: 0 auto;
    text-align: center;
  }
`;

export {StyledImage};
