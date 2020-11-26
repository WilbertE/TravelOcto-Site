import {useEffect} from "react";
import Router from "next/router";
import nextCookie from "next-cookies";
import isAuthenticated from "./isAuthenticated";
import cookie from "js-cookie";

export const auth = (ctx) => {
  let {token} = nextCookie(ctx);
  token = isAuthenticated(token);

  // If there's no token, it means the user is not logged in.
  if (!token) {
    if (typeof window === "undefined") {
      ctx.res.writeHead(302, {Location: "/cms"});
      ctx.res.end();
    } else {
      Router.push("/cms");
    }
  }
  return token;
};

export const logout = () => {
  cookie.remove("token");
  cookie.remove("refreshToken");
  window.localStorage.setItem("loginStatus", false);
  Router.push("/cms");
};

const WithAuthentication = (WrappedComponent) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === "loginStatus") {
        logout();
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx) => {
    const token = auth(ctx);
    const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
    return {...componentProps, token};
  };

  return Wrapper;
};

export default WithAuthentication;
