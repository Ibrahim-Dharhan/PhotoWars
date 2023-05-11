"use strict"

import path = require('path');
import NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
    photoWars: "./photoWars.tsx",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/i,
        type: 'asset'
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: '[name].bundle.js',
  },
  devServer: {
    static: path.resolve(__dirname, 'dist/'),
    hot: true,
    port: 3000,
    proxy: {
      '*': {
        target: 'http://localhost:8080/',
        secure: false
      }
    },
  },
  plugins: [
    new NodemonPlugin({
      script: './server.ts',
      watch: [
        './server.ts',
        './definitions/**/*.ts',
        './development/**/*.ts',
        './endpoints/**/*.ts',
        './types/**/*.ts'
      ], 
      verbose: true,
    }),
  ],
};
