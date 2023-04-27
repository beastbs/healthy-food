const path = require("path");

module.exports = {
  mode: "development",
  entry: "./js/script.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  watch: true,
  devtool: "source-map",
  module: {},
};
