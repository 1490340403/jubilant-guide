/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2021-04-10 23:14:49
 * @LastAuthor: 陈刚强
 * @LastTime: 2021-04-11 17:28:19
 * @message: 
 */
const {merge}=require('webpack-merge')
const baseWebpackConfig=require('./webpack.config.base')
const webpackConfig=merge(baseWebpackConfig,{
  mode:"production",
  devtool:"eval-source-map",
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  }
})
module.exports=webpackConfig