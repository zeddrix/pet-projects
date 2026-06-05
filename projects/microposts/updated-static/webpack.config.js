const path = require("path");

const publicPath =
  process.env.PUBLIC_PATH ?? "/pet-projects/projects/microposts/";

module.exports = {
  entry: {
    app: ["@babel/polyfill", "./src/app.js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js",
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  }
}
