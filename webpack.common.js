const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  output: {
    path: path.resolve("dist", "assets"),
    filename: "[name].js",
    chunkFilename: "[id].[chunkhash].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs"],
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace("@", "")}`;
          },
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: "style-loader", // Creates style nodes from JS strings.
          },
          {
            loader: "css-loader", // Translates CSS into CommonJS.
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
          },
        ],
      },
    ],
  },
  externals: {
    zendesk_app_framework_sdk: "ZAFClient",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      hash: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "widget/manifest.json",
          to: "../manifest.json",
        },
        {
          from: "widget/translations",
          to: "../translations",
        },
        {
          from: "widget/assets",
        },
      ],
    }),
  ],
};
