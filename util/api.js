import fetch from "isomorphic-unfetch";
import cookie from "js-cookie";
import cookies from "next-cookies";
import {apiEndpoints} from "./apiEndpoints";
export const TravelOctoBase = "http://localhost:61186/";
export const ScoutingHawkBase = "http://localhost:58591/";

const Api = function (options) {
  var globalOptions = {
    onLoad: () => {},
    onFinished: () => {},
  };
  globalOptions = {...globalOptions, ...options};

  //Loading state
  this.loading = false;

  this.endpoints = apiEndpoints(TravelOctoBase, ScoutingHawkBase);

  this.fetch = (options) => {
    var defaultOptions = {
      context: null,
      endpoint: null,
      urlReplacements: [],
      body: null,
    };
    options = {...defaultOptions, ...options};

    //Validate
    if (options.endpoint == null) throw "Endpoint needs to be set";

    //Replace url parameters
    let url = options.endpoint.url;
    options.urlReplacements.forEach((replacement) => (url = url.replace("{" + replacement[0] + "}", replacement[1])));

    //Set body
    var body = options.body ? (options.postAsForm ? options.body : JSON.stringify(options.body)) : null;

    //Set headers
    var headers = !options.postAsForm ? {"content-type": "application/json"} : {};

    if (options.endpoint.authorization) {
      const token = options.context ? cookies(options.context).token : cookie.get("token");
      headers["authorization"] = "Bearer " + token;
    }

    //Make request
    globalOptions.onLoad();
    return fetch(url, {
      method: options.endpoint.method,
      body: body,
      headers: headers,
    })
      .then((response) => {
        if (response.status == 401 && url != this.endpoints.administratorRefreshToken.url && url != this.endpoints.administratorLogin.url) {
          console.log("Refresh");
          return (async () => {
            var tokenRefreshed = await this.refreshToken();
            if (tokenRefreshed) return await this.fetch(options);
            return response.json();
          })();
        } else {
          return response.json();
        }
      })
      .then((json) => {
        globalOptions.onFinished();
        return json;
      })
      .catch(function (ex) {
        globalOptions.onFinished();
        return ex;
        //return {success: false, message: {title: "Oops", content: "De server reageert niet", exception: ex}};
      });
  };

  this.refreshToken = async () => {
    const refreshToken = cookie.get("refreshToken");
    var result = await this.fetch({endpoint: this.endpoints.administratorRefreshToken, body: {RefreshToken: refreshToken}});

    if (!result.success) {
      return false;
    } else {
      cookie.set("token", result.token.token, {expires: 1});
      cookie.set("refreshToken", result.token.refreshToken, {expires: 30});
      return true;
    }
  };
};

export default Api;
