const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: { popup: path.resolve("./src/popup/popup.tsx") },
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/assets/manifest.json"),
          to: path.resolve("dist"),
        },
        {
          from: path.resolve("src/assets/"),
          to: path.resolve("dist"),
        },
      ],
    }),
    new HtmlPlugin({
      title: "English Vocabulary Booster Chrome Extension",
      filename: "popup.html",
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  output: {
    filename: "index.js",
  },
};
