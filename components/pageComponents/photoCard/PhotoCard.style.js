import {ButtonBase} from "@material-ui/core";
import styled from "styled-components";

const PhotoCardPrimitive = function ({linkHref, linkTarget, linkTitle, liveMode, ...props}) {
  if (linkHref != "" && liveMode != false)
    return (
      <ButtonBase component="a" href={linkHref} target={linkTarget} title={linkTitle} {...props}>
        {props.children}
      </ButtonBase>
    );
  return <div {...props}>{props.children}</div>;
};

const StyledPhotoCard = styled(PhotoCardPrimitive)`
  display: flex;
  align-items: stretch;
  text-decoration: none;
  color: ${(props) => props.theme.color.text};
  width: calc(100% + 16px);
  min-height: 125px;
  margin: -8px;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;
  transition: transform 0.15s ease-out;

  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 5px;
    background: #f2f4f7;
    opacity: 0;
    transition: opacity 0.15s ease-in-out;
    z-index: 0;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
  }

  .photo-card-image-wrapper picture {
    transform-origin: center center;
    transform: scale(1);
    transition: transform 0.15s ease-out;
  }

  > .MuiTouchRipple-root {
    z-index: 1;
  }
  > *:not(.MuiTouchRipple-root) {
    position: relative;
    z-index: 1;
  }

  @media screen and (min-width: 960px) {
    ${(props) =>
      props.linkHref != "" &&
      props.liveMode != false &&
      ` &:hover{
        transform: scale(1.025);

        z-index: 3;
        .photo-card-image-wrapper picture{
          transform: scale(1.25);
          transition: transform 10s ease-out;
        }
      }
      &:hover:after{
        opacity:1;
      }
    `}
  }

  .photo-card-image-wrapper {
    position: relative;
    height: 100%;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 1.25rem;
    @media screen and (min-width: 600px) {
      height: 220px;
      margin-bottom: 0rem;
    }
  }

  .photo-card-content {
    padding: 8px 0;
  }
`;

export {StyledPhotoCard};
