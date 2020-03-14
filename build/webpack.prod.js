// const merge = require('webpack-merge')
// const commonConfig = require('./webpack.common.js')
const workboxPlugin = require('workbox-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const optimizeCss = require('optimize-css-assets-webpack-plugin');

// 使用CommonJS的语法
const prodConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map',
	plugins: [
		new ExtractTextPlugin("styles.css"),
		new workboxPlugin.GenerateSW({
			clientsClaim:true,
			skipWaiting:true
		})
	],
	module: {
		rules: [{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: "css-loader"
			})
		}]
	},
	optimization: {
		minimizer:[new optimizeCss({})]
	},
	output: {
		filename: '[name].[contenthash].js', //打包后的文件命名，默认为main.js
		chunkFilename: '[name].[contenthash].js'
	}
}

module.exports = prodConfig
// module.exports = merge(commonConfig, prodConfig)