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
      // TODO 1 : name — comment ce MFE s'annonce sur le réseau ?
      // TODO 2 : filename — quel fichier le Shell va-t-il charger ?
      // TODO 3 : exposes — quel composant expose-t-on ? (clé → chemin fichier)
      // TODO 4 : shared — quelles libs partager avec le Shell ?
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
};
