const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
// const jshintrc = require('./.jshintrc');

console.log(__filename);

module.exports = {
  context: __dirname + "",
  entry: () => ({
    index: path.resolve(__dirname, 'src/index.js')
  }),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    chunkFilename: '[id].[name].lazy.chunk.js'
  },
  devtool: 'inline-source-map',
  devServer: {
  	contentBase: './dist',
  	// hot: true
  },
  plugins: [
  	// new webpack.HotModuleReplacementPlugin(),
  	new CleanWebpackPlugin(['dist']),
  	new HtmlWebpackPlugin({
  		title: 'webpack test'
  	}),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common' // bundle name
    })
  ],
  module: {
  	rules: [
  		// {
  		// 	test: /\.(ts|tsx)?$/,
  		// 	use: 'ts-loader',
  		// 	exclude: /node_modules/
  		// },
  		{
  			test: /\.css$/,
  			use: [
  				'style-loader',
  				'css-loader'
  			],
  			exclude: /node_modules/
  		},
  		{
  			test: /\.(png|svg|jpg|gif)$/,
  			use: [
  				'file-loader'
  			],
  			exclude: /node_modules/
  		},
  		{
  			test: /\.(woff|woff2|eot|ttf|otf)$/,
  			use: [
  				'file-loader'
  			],
  			exclude: /node_modules/
  		},
  		//----------------- jshint ------------------
  		{
  			test: /\.js$/,
        // options: (name) => {
        //   console.log('name: ', name);
        //   return {};
        // },
  			enforce: "pre",
  			use: [{
  				loader: 'jshint-loader'
  				// options: JSON.parse(jshintrc)// if not defined, looking in the same folder or in parent folder
  			}],
  			exclude: /node_modules/
  		}
  	]
  }
  // resolve: {
  //   extensions: [ ".tsx", ".ts", ".js" ]
  // }
};