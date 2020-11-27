import React from "react";
import {TravelOctoBase} from "~/util/api";
import NextDocument, {Html, Head, Main, NextScript} from "next/document";
import {ServerStyleSheet as StyledComponentSheets} from "styled-components";
import {ServerStyleSheets as MaterialUiServerStyleSheets} from "@material-ui/styles";

const removeCommentsAndSpacing = (data = "") => {
  let str = data.props.dangerouslySetInnerHTML["__html"];
  data.props.dangerouslySetInnerHTML["__html"] = str.replace(/\/\*.*\*\//g, " ").replace(/\s+/g, " ");
  return data;
};

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const styledComponentSheet = new StyledComponentSheets();
    const materialUiSheets = new MaterialUiServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => styledComponentSheet.collectStyles(materialUiSheets.collect(<App {...props} />)),
        });

      const initialProps = await NextDocument.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: [
          <React.Fragment key="initial">{initialProps.styles}</React.Fragment>,
          <React.Fragment key="material">{removeCommentsAndSpacing(materialUiSheets.getStyleElement())}</React.Fragment>,
          <React.Fragment key="styledComponent">{styledComponentSheet.getStyleElement()}</React.Fragment>,
        ],
      };
    } finally {
      styledComponentSheet.seal();
    }
  }

  render() {
    const fontExtensions = [
      ["woff2", "woff2"],
      ["woff", "woff"],
      ["ttf", "truetype"],
    ];
    return (
      <Html lang="nl">
        <Head>
          <style
            dangerouslySetInnerHTML={{
              __html: `
              @font-face { font-family: 'Futura PT';
                src: ${fontExtensions.map((fontExtension) => {
                  return "url('" + TravelOctoBase + "public/fonts/FuturaPT-Light." + fontExtension[0] + "') format('" + fontExtension[1] + "')";
                })};
                font-weight: normal;
                font-style: normal;
            }

            @font-face {
              font-family: 'Futura PT';
              src: ${fontExtensions.map((fontExtension) => {
                return "url('" + TravelOctoBase + "public/fonts/FuturaPT-Book." + fontExtension[0] + "') format('" + fontExtension[1] + "')";
              })};
              font-weight: bold;
              font-style: normal;
          }`,
            }}
          />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=G-6V81WEP8RS`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WVKBW4QP0J', {
                page_path: window.location.pathname,
              });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
