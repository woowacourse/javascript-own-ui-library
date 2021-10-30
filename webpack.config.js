const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name][chunkhash].js",
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: ["@babel/plugin-transform-runtime"],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(ts)$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
    }),
  ],
  //dev
  mode: "development",
  devtool: "eval-cheap-source-map",
  devServer: {
    compress: true,
    hot: true,
    port: 9000,
  },
};
