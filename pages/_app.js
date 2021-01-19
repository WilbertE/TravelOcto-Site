import NextApp from "next/app";
import React, {useState} from "react";
import Head from "next/head";
import {ThemeProvider} from "styled-components";
import theme from "~/Theme/Theme";
import GlobalStyle from "~/Theme/GlobalStyle";
import {StylesProvider} from "@material-ui/core/styles";
import {library} from "@fortawesome/fontawesome-svg-core";
import {withRouter} from "next/router";
import {
  faTimes,
  faSearch,
  faPlusCircle,
  faFile,
  faTag,
  faFileImport,
  faTrashAlt,
  faBars,
  faSignOutAlt,
  faTachometerAltFastest,
  faCopy,
  faAlignLeft,
  faPlus,
  faRetweet,
  faCheck,
  faArrowSquareRight,
  faEdit,
  faAngleLeft,
  faAngleRight,
  faMapMarkerPlus,
  faTextWidth,
  faCodeBranch,
  faPencil,
  faFileCode,
  faLink,
  faBold,
  faItalic,
  faObjectGroup,
  faSortNumericUpAlt,
  faLayerGroup,
  faArrowRight,
  faAngleUp,
  faAngleDown,
  faRandom,
  faHSquare,
  faUpload,
  faImages,
  faSquare,
  faHeading,
  faGameBoardAlt,
  faImagePolaroid,
  faAlignJustify,
  faThLarge,
  faTags,
  faFileAlt,
  faEllipsisV,
  faSitemap,
  faFlag,
  faSlidersH,
  faSave,
  faArrowUp,
  faArrowDown,
  faInfoCircle,
  faSunCloud,
  faFirstAid,
  faMoneyBillWave,
  faCoins,
  faPlug,
  faGlass,
  faCars,
  faArrowLeft,
  faFolderOpen,
  faFilePlus,
  faImage,
  faColumns,
  faBracketsCurly,
} from "@fortawesome/pro-light-svg-icons";

import {faExclamationTriangle} from "@fortawesome/pro-solid-svg-icons";
import {} from "@fortawesome/pro-regular-svg-icons";
import {GlobalStoreContext, GlobalStoreInitial} from "~/util/globalStore";
import MessageboxRenderer from "~/components/molecules/Messagebox/MessageboxRenderer";
import MessageboxProvider from "~/components/molecules/Messagebox/MessageboxProvider";
import {RecoilRoot} from "recoil";
import parallax from "~/util/parallax";
import {faFacebookF, faInstagram} from "@fortawesome/free-brands-svg-icons";

library.add(
  faTimes,
  faSearch,
  faPlusCircle,
  faFile,
  faTag,
  faFileImport,
  faTrashAlt,
  faBars,
  faSignOutAlt,
  faTachometerAltFastest,
  faCopy,
  faAlignLeft,
  faPlus,
  faRetweet,
  faCheck,
  faArrowSquareRight,
  faEdit,
  faAngleLeft,
  faAngleRight,
  faMapMarkerPlus,
  faTextWidth,
  faCodeBranch,
  faFileCode,
  faPencil,
  faThLarge,
  faBold,
  faItalic,
  faLink,
  faObjectGroup,
  faSortNumericUpAlt,
  faLayerGroup,
  faArrowRight,
  faExclamationTriangle,
  faAngleUp,
  faAngleDown,
  faRandom,
  faHSquare,
  faUpload,
  faImages,
  faSquare,
  faHeading,
  faGameBoardAlt,
  faImagePolaroid,
  faAlignJustify,
  faTags,
  faFacebookF,
  faInstagram,
  faFileAlt,
  faEllipsisV,
  faSitemap,
  faFlag,
  faSlidersH,
  faSave,
  faArrowUp,
  faArrowDown,
  faInfoCircle,
  faSunCloud,
  faFirstAid,
  faMoneyBillWave,
  faCoins,
  faPlug,
  faGlass,
  faCars,
  faArrowLeft,
  faFolderOpen,
  faFilePlus,
  faImage,
  faColumns,
  faBracketsCurly
);

const GlobalStoreProvider = function (props) {
  const [globalStore, setGlobalStore] = useState(GlobalStoreInitial);
  return <GlobalStoreContext.Provider value={{globalStore, setGlobalStore}}>{props.children}</GlobalStoreContext.Provider>;
};

class App extends NextApp {
  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) jssStyles.parentNode.removeChild(jssStyles);
    window.addEventListener("scroll", parallax);
  }

  componentDidUpdate(prevProps) {
    //Send page to google analytics
  }

  componentWillUnmount = () => {
    if (window) window.removeEventListener("scroll", parallax);
  };

  constructor(props) {
    super();

    if (typeof window !== "undefined") {
      if (window.location.hostname != "localhost") {
        console.log("Triggered");
        window.gtag("config", "G-WVKBW4QP0J", {
          page_path: props.router.asPath,
        });
      } else {
        console.log("NOT Triggered");
      }
    }
  }

  render() {
    const {Component, pageProps} = this.props;
    var authenticated = this.props.pageProps.token;

    return (
      <>
        <Head>
          <title>TravelOcto</title>
        </Head>
        <GlobalStoreProvider>
          <ThemeProvider theme={theme}>
            <StylesProvider injectFirst>
              <GlobalStyle />
              <RecoilRoot>
                <Component {...pageProps} />
                <MessageboxRenderer />
              </RecoilRoot>
            </StylesProvider>
          </ThemeProvider>
        </GlobalStoreProvider>
      </>
    );
  }
}

export default withRouter(App);
