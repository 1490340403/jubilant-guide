/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2021-04-10 23:14:35
 * @LastAuthor: 陈刚强
 * @LastTime: 2021-04-10 23:30:44
 * @message: 
 */
const {merge}=require('webpack-merge')
const baseWebpackConfig=require('./webpack.config.base')
const webpackConfig=merge(baseWebpackConfig,{
  mode:"development",
  devtool:"eval-source-map",
})
module.exports=webpackConfig