const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js')
const complier = webpack(config)//webpack编译

const app = express()
app.use(webpackDevMiddleware(complier,{
    publicPath:config.output.publicPath//若config.output.publicPath没有配置这也不用写。为空就好了
}))
app.listen(3000, () => {
    console.log('server in 3000')
})