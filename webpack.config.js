const path = require('path');

module.exports = {
  mode: 'development',			// or 'production'
  devtool: "source-map",
  entry: './build-tsc/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};