const NodemonPlugin = require('nodemon-webpack-plugin');

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
    path: `${__dirname}/compiled`,
    publicPath: '/',
    filename: '[name].bundle.js',
  },
  plugins: [
    new NodemonPlugin({
      script: './server.ts',
      watch: './server.ts',
      verbose: true,
    }),
  ],
};
