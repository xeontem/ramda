const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
// const jshintrc = require('./.jshintrc');

console.log(__filename);

module.exports = {
  entry: () => ({index: path.resolve(__dirname, 'src/index.js')}),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    chunkFilename: '[id].[name].lazy.chunk.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 8888,
    // hot: true
  },
  module: {
    rules: [
      // {
      // 	test: /\.(ts|tsx)?$/,
      // 	use: 'ts-loader',
      // 	exclude: /node_modules/
      // },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
        exclude: /node_modules/
      },
      //----------------- jshint ------------------
  //     {
  //       test: /\.js$/,
  //       use: [{
  //         loader: 'babel-loader',
  //         options: {
  //           presets: [
  //             ["env", { "modules": false }] // IMPORTANT
  //           ]
  //         }
  //       }],
  //       exclude: /node_modules/
  //     }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'webpack test'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common' // bundle name
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: true
    //   },
    //   output: {
    //     comments: false
    //   },
    //   sourceMap: true
    // })
  ]
};