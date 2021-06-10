/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2021-04-10 16:29:48
 * @LastAuthor: 陈刚强
 * @LastTime: 2021-04-11 17:29:10
 * @message: 
 */
const path=require('path');
const webpack=require('webpack')
const util=require('./util')
const nodeExcternals=require('webpack-node-externals');
const {CleanWebpackPlugin}=require("clean-webpack-plugin")
const webpackConfig={
  target:"node",
  entry:{
    server:path.join(util.APP_PATH,'index.js')
  },
  output:{
    filename:"[name].bundle.js",
    path:util.DIST_PATH
  },

  module:{
    rules: [
      {
        test:/\.(js|jsx)$/,
        use:{
          loader:"babel-loader"
        },
        exclude:[path.join(__dirname,'/node_modules')]
      }
    ]
  },
  externals:[nodeExcternals()],
  plugins:[
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV:(process.env.NODE_ENV==='production'||
        process.env.NODE_ENV=='prod')?"'production'":"'development'"
      }
    })
  ],
  // node:{
  //   console:true,
  //   global:true,
  //   process:true,
  //   Buffer:true,
  //   __dirname:true,
  //   __filename:true,
  //   setImmediate:true,
  //   path:true
  // }
}
module.exports=webpackConfig