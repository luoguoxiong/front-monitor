const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = {
  entry: "./lib/index.js",
  output: {
    path: path.join(__dirname, "build"),
  },
  devServer: {
    port: 3100,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "front-monitor",
      template: "./webpack/template.html",
    }),
  ],
};
module.exports = config;
