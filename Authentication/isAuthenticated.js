import atob from "atob";
function isAuthenticated(token) {
  try {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function(c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    token = JSON.parse(jsonPayload);
    if (Date.now() >= token.exp * 1000) {
      return null;
    } else {
      return token;
    }
  } catch (exception) {
    return null;
  }
}

export default isAuthenticated;
