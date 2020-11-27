import fetch from "isomorphic-unfetch";
import cookie from "js-cookie";
import cookies from "next-cookies";
export const TravelOctoBase = "https://api.travelocto.com/";
export const ScoutingHawkBase = "https://api.scoutinghawk.com/";

const Api = function (options) {
  var globalOptions = {
    onLoad: () => {},
    onFinished: () => {},
  };
  globalOptions = {...globalOptions, ...options};

  //Loading state
  this.loading = false;

  //Endpoints
  this.endpoints = {};
  const registerEndpoint = (name, method, url, authorization = true) => {
    this.endpoints[name] = {
      method: method,
      url: url,
      authorization: authorization,
    };
  };

  //Register endpoints
  registerEndpoint("administratorLogin", "POST", TravelOctoBase + "administrator/token", false);
  registerEndpoint("administratorRefreshToken", "POST", TravelOctoBase + "administrator/refreshtoken", true);
  registerEndpoint("getPages", "GET", TravelOctoBase + "page/all", true);
  registerEndpoint("getPage", "GET", TravelOctoBase + "page/{pageId}", true);
  registerEndpoint("getPageByUrl", "GET", TravelOctoBase + "page?url={url}", false);
  registerEndpoint("setPageProperties", "PATCH", TravelOctoBase + "page/{pageId}/meta", true);
  registerEndpoint("addPage", "POST", TravelOctoBase + "page", true);
  registerEndpoint("getTags", "GET", TravelOctoBase + "tag/all", true);
  registerEndpoint("getVariables", "GET", TravelOctoBase + "tag/{tag}/variable/preview", true);
  registerEndpoint("savePageComponents", "PATCH", TravelOctoBase + "page/{pageId}/components", true);
  registerEndpoint("getImages", "GET", TravelOctoBase + "image/all", true);
  registerEndpoint("deleteImages", "DELETE", TravelOctoBase + "image", true);
  registerEndpoint("uploadImage", "POST", TravelOctoBase + "image", true);
  registerEndpoint("getContinentList", "GET", ScoutingHawkBase + "continent/all", false);
  registerEndpoint("getContinentByContinentCode", "GET", ScoutingHawkBase + "continent/byContinentcode/{continentcode}", false);
  registerEndpoint("getContinentByUrlName", "GET", ScoutingHawkBase + "continent/byUrlName/{urlName}", false);
  registerEndpoint("getCountryList", "GET", ScoutingHawkBase + "country/all", false);
  registerEndpoint("getCountryListByContintent", "GET", ScoutingHawkBase + "country/byContinentCode/{continentCode}", false);
  registerEndpoint("getCountryByIso2", "GET", ScoutingHawkBase + "country/byIso2/{iso2}", false);
  registerEndpoint("getCountryByUrlName", "GET", ScoutingHawkBase + "country/byUrlName/{urlName}", false);

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
    var body = options.body ? JSON.stringify(options.body) : null;

    //Set headers
    var headers = {"content-type": "application/json"};

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
