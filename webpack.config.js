const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const outputDirectory = 'build/client';

module.exports = {
  entry: ['./src/client/index.js'],
  output: {
    path: path.resolve(__dirname, outputDirectory),
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react'],
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    port: 3000,
    open: false,
    proxy: {
      '/api': 'http://localhost:3666',
    },
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: './src/client/index.html',
      filename: './index.html',
    }),
    new CopyWebpackPlugin([
      { from: 'src/client/css', to: 'css' },
      { from: 'src/client/img', to: 'img' },
      { from: 'src/client/fonts', to: 'fonts' },
      { from: 'src/client/index.fonts.css', to: '' },
      { from: 'src/client/index.styles.css', to: '' },
      { from: 'src/electron.js', to: path.resolve(__dirname, 'build') },
    ]),
  ],
};
