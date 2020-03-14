const webpack = require('webpack')
// const merge = require('webpack-merge')
// const commonConfig = require('./webpack.common.js')

// 使用CommonJS的语法
const devConfig = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true, //开启Hot Module Replacement的功能
		// hotOnly: true //即便Hot Module Replacement的功能没有生效。也不让浏览器自动刷新
		proxy:{
			'/react/api':{
				target:'http://www.dell-lee.com',
				secure:false,
				pathRewrite:{
					'header.json':'demo.json'
				},
				bypass:function(req,res,proxyOptions){
					if(req.headers.accept.indexOf('html') !== -1){//如果请求的链接是html。就不会进行代理。该返回什么就返回什么
						return false;
					}
				},
				changeOrigin:true,//有些网站对origin进行了限制，防止爬虫
				historyApiFallback:true,//若发现请求的路径后端服务器中没有。会转化成对根路径的请求
			}
		}
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	plugins: [
		// new CleanWebpackPlugin(), //new CleanWebpackPlugin(['dist'])开发环境下并不会生成dist文件
		new webpack.HotModuleReplacementPlugin()
	],
	output: {
		filename: '[name].js', //打包后的文件命名，默认为main.js
		chunkFilename: '[name].js'
	}
}
module.exports = devConfig
// module.exports = merge(commonConfig, devConfig)