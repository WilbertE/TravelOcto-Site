const path = require("path");
const withImages = require("next-images");

//CSS
module.exports = withImages({
  esModule: true,
  webpack: config => {
    config.resolve.alias["~"] = path.resolve(__dirname);
    return config;
  }
});
