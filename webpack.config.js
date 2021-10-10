const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const mode =
  process.env.NODE_ENV === "production" ? process.env.NODE_ENV : "development";

module.exports = {
  mode,
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts/,
        use: ["ts-loader"],
      },
      {
        test: /\.s?css/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HTMLWebpackPlugin({
      template: "src/template.html",
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
};
