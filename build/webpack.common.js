const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack')
const merge = require('webpack-merge')
const devConfig = require('./webpack.dev.js')
const prodConfig = require('./webpack.prod.js')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const fs = require('fs')

// const plugins = [
// 	new HtmlWebpackPlugin({
// 		template: 'src/index.html',
// 		filename:'index.html',
// 		chunks:['runtime','vendors','main']
// 	}),
// 	new HtmlWebpackPlugin({
// 		template: 'src/index.html',
// 		filename:'list.html',
// 		chunks:['runtime','vendors','list']
// 	}),
// 	new CleanWebpackPlugin(), //new CleanWebpackPlugin(['dist'])
// ];
// const files = fs.readdirSync(path.resolve(__dirname,'../dll'))
// files.forEach(file=>{
// 	if(/.*\.dll.js/.test(file)){
// 		plugins.push(new AddAssetHtmlWebpackPlugin({
// 			filepath:path.resolve(__dirname,'../dll',file)
// 		}))
// 	}
// 	if(/.*\.manifest.json/.test(file)){
// 		plugins.push(new webpack.DllReferencePlugin({
// 			manifest:path.resolve(__dirname,'../dll',file)
// 		}))
// 	}
// })

const makePlugins = (configs) => {
	const plugins = [
		// new HtmlWebpackPlugin({
		// 	template: 'src/index.html',
		// 	filename: 'index.html',
		// 	chunks: ['runtime', 'vendors', 'main']
		// }),
		// new HtmlWebpackPlugin({
		// 	template: 'src/index.html',
		// 	filename: 'list.html',
		// 	chunks: ['runtime', 'vendors', 'list']
		// }),
		new CleanWebpackPlugin(), //new CleanWebpackPlugin(['dist'])
	];
	Object.keys(configs.entry).forEach(item => {
		plugins.push(
			new HtmlWebpackPlugin({
				template: 'src/index.html',
				filename: `${item}.html`,
				chunks: ['runtime', 'vendors', item]
			})
		)
	});
	const files = fs.readdirSync(path.resolve(__dirname, '../dll'))
	files.forEach(file => {
		if (/.*\.dll.js/.test(file)) {
			plugins.push(new AddAssetHtmlWebpackPlugin({
				filepath: path.resolve(__dirname, '../dll', file)
			}))
		}
		if (/.*\.manifest.json/.test(file)) {
			plugins.push(new webpack.DllReferencePlugin({
				manifest: path.resolve(__dirname, '../dll', file)
			}))
		}
	})
	return plugins;
}

const commonConfig = {
	// entry: './src/index.js', //项目从该文件为入口进行打包
	entry: {
		// lodash:'./src/lodash.js',
		index: './src/index.js',
		// list: './src/index.js'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		mainFiles: ['index', 'child'],
		alias: {
			xieting: path.resolve(__dirname, '../src/child')
		}
	},
	// 当不知道怎么打包模块的时候到这个文件里面寻找配置项
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/, //如果你的js文件是在node_modules目录下的。那我就不用使用babel-loader来处理js了
			use: [{
					loader: "babel-loader"
				},
				// {
				// 	loader:"imports-loader?this=>window"
				// }
			]
			// loader: "babel-loader",
			// options: {
			// presets:[['@babel/preset-env',{
			// 	targets:{
			// 		chrome:'67'
			// 	},
			// 	useBuiltIns:'usage'
			// }]]
			// "plugins": [
			// 	[
			// 		"@babel/plugin-transform-runtime",
			// 		{
			// 			"absoluteRuntime": false,
			// 			"corejs": 2,
			// 			"helpers": true,
			// 			"regenerator": true,
			// 			"useESModules": false
			// 		}
			// 	]
			// ]
			// }
		}, {
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'file-loader',
				options: {
					name: '[name].[ext]', //原来的名字+原来的后缀名。打包之后的文件的命名
					outputPath: 'images/', //打包之后文件存在的该文件夹下
					limit: 2048 //如果图片大小超过2048将不压缩成base64
				}
			}
		}, {
			test: /\.scss$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2,
						modules: true
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}, {
			test: /\.vue$/,
			use: 'vue-loader'
		}]
	},
	// plugins,
	// plugins: [
	// 	new HtmlWebpackPlugin({
	// 		template: 'src/index.html'
	// 	}),
	// 	new CleanWebpackPlugin(), //new CleanWebpackPlugin(['dist'])
	// 	// new webpack.ProvidePlugin({
	// 	// 	$:'jquery',
	// 	// 	_join:['lodash','join']
	// 	// })
	// 	new AddAssetHtmlWebpackPlugin({
	// 		filepath:path.resolve(__dirname,'../dll/vendors.dll.js')
	// 	}),
	// 	new webpack.DllReferencePlugin({
	// 		manifest:path.resolve(__dirname,'../dll/vendors.manifest.json')
	// 	})
	// ],
	optimization: { //同步加载代码
		runtimeChunk: {
			name: 'runtime' //低版本的webpack打包的时候没改变文件内容，但是打包的时候会生成新的contenthash。可以增加这一句来做兼容
		},
		usedExports: true,
		splitChunks: {
			chunks: 'all', //Code Splitting
			// cacheGroups:{
			// 	vendors:false,
			// 	default:false
			// }
		}
	},
	performance: false,
	output: {
		path: path.resolve(__dirname, '../dist') //打包后的文件放到该文件夹下。注意要使用绝对路径
	}
}

commonConfig.plugins = makePlugins(commonConfig);

module.exports = (env, argv) => {
	if (argv.mode === 'production') {
		return merge(commonConfig, prodConfig);
	} else {
		return merge(commonConfig, devConfig);
	}
}