const path = require('path');

const srcDir = path.join(__dirname, 'client/src');
const distDir = path.join(__dirname, 'client/dist');

module.exports = {
  mode: 'development',
  entry: srcDir,
  output: {
    filename: 'bundle.js',
    path: distDir,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};