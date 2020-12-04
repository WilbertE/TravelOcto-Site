const apiEndpoints = function (TravelOctoBase, ScoutingHawkBase) {
  //Endpoints
  let endpoints = {};
  const registerEndpoint = (name, method, url, authorization = true) => {
    endpoints[name] = {
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
  registerEndpoint("addBlog", "POST", TravelOctoBase + "blog", true);
  registerEndpoint("getBlogs", "GET", TravelOctoBase + "blog/all", false);
  registerEndpoint("getBlogsSortedLimit", "GET", TravelOctoBase + "blog/all?sortMethod={sortMethod}&sortKey={sortKey}&limit={limit}", false);
  registerEndpoint("getBlog", "GET", TravelOctoBase + "blog/{blogId}", true);
  registerEndpoint("saveBlogComponents", "PATCH", TravelOctoBase + "blog/{blogId}/components", true);
  registerEndpoint("getBlogByUrl", "GET", TravelOctoBase + "blog?url={url}", false);
  registerEndpoint("deleteBlog", "DELETE", TravelOctoBase + "blog/{blogId}", true);

  return endpoints;
};

export {apiEndpoints};
