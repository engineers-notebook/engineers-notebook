const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { O_EXCL } = require('constants');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        secure: false,
        changeorigin: true,
      },
      '/auth': {
        target: 'http://localhost:3000/',
        secure: false,
        changeorigin: true,
      },
    },
    publicPath: '/',
  },
};
