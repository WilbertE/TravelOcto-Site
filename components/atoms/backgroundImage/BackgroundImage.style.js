import styled from "styled-components";

const BackgroundImagePrimitive = function ({mode, ...props}) {
  return <picture {...props}>{props.children}</picture>;
};

const StyledBackgroundImage = styled(BackgroundImagePrimitive)`
  width: 100%;
  display: block;
  height: 100%;
  position: ${(props) => (props.mode == "image" ? "relative" : "absolute")};

  > img {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }

  .image-tag {
    font-size: 0.7em;
    background-color: #940048;
    color: #fff;
    padding: 0px 4px;
    border-radius: 3px;
    line-height: 1.15rem;
    left: 50%;
    position: absolute;
    top: 50%;
    z-index: 1;
    letter-spacing: 0.5px;
    transform: translate(-50%, -50%);
  }
`;

export {StyledBackgroundImage};
