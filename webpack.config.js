'use strict';
var path = require('path');
var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

module.exports = {
  entry: {
    index: './src/entries/index.jsx'
  },
  output: {
    path: path.join(__dirname, 'bundle'),
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.js.*$/,
      exclude: /node_modules/,
      loaders: ['babel-loader?optional=runtime']
    }, {
      test: /\.(png)$/,
      loader: 'url?name=[name].[ext]'
    }, {
      test: /\.styl$/,
      loader: 'style-loader!css-loader!stylus-loader?sourceMap=true'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!url-loader'
    }, {
      test: /\.(ttf|eot|otf|svg)$/,
      loader: 'url?name=[name].[ext]'
    }, {
      test: /\.woff$/,
      loader: 'url?limit=10000&minetype=application/font-woff&name=[name].[ext]'
    }]
  },
  plugins: [definePlugin]
};
