const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: 'http://localhost:3003/',
    clean: true,
  },
  devServer: {
    port: 3003,
    hot: true,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: { shared: path.resolve(__dirname, '../shared') },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'catalog',                 // TODO 1
      filename: 'remoteEntry.js',      // TODO 2
      exposes: {                       // TODO 3
        './App': './src/App.jsx',
      },
      shared: {                        // TODO 4
      react: { singleton: true, requiredVersion: false },
      'react-dom': { singleton: true, requiredVersion: false },
      },
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
};
