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
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
  },
  output: {
    path: path.resolve(__dirname, 'compiled/'),
    publicPath: '/compiled/',
    filename: '[name].bundle.js',
  },
  devServer: {
    static: path.resolve(__dirname, 'compiled/'),
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
      watch: ['./server.ts', './development/**/*.ts', './endpoints/**/*.ts', './schemas/**/*.ts'], 
      verbose: true,
    }),
  ],
};
