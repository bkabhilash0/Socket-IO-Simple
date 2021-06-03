const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
  template: path.join(__dirname, "index.html"),
  filename: "./index.html",
});

module.exports = {
  mode: "development",
  entry: path.join(__dirname),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname),
    port: 5000,
    hot: true,
    open: true,
  },
  plugins: [htmlPlugin],
};
