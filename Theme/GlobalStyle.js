import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`

  html{
    font-family: "Lato",sans-serif;
    font-size: 14px;
    font-weight:300;
    color: ${(props) => props.theme.color.text};
    @media screen and (min-width: 500px) {
      font-size: calc(14px + 4 * ((100vw - 500px) / 1900));
    }
    @media screen and (min-width: 2400px) {
      font-size: 18px;
    }
    line-height: 1.6em;
  }

  textarea{
    font-size: 1em;
    font-family: "Lato",sans-serif;
    line-height: 1.5em
  }

  a{
    color: #323E7A;
    text-decoration: underline;
  }

  .secondary-font{
    font-family: "Futura PT";
  }

  html,body,#__next {
    background: #fff;
    height: 100%;
    margin: 0;
  }

  .MuiTabs-root{
    width: 100%;
    margin-bottom: 35px;

    .MuiTabs-flexContainer{
      width: 100%;
      align-items: stretch;
      justify-content: space-around;
      &:after{
        display: block;
        content:'';
        position: absolute;
        bottom: 0;
        height:1px;
        left:0;
        right:0;
        background-color:#E0E0E0;
      }
    }

    .MuiTabs-indicator{
      background-color:#323E7A;
    }

    button{
      width: 50%;
    }

    .MuiTab-root{
      text-transform: initial;
    }
  }
`;

export default GlobalStyle;
