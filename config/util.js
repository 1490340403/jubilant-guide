/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2021-04-11 17:04:26
 * @LastAuthor: 陈刚强
 * @LastTime: 2021-04-11 17:06:41
 * @message: 
 */
const path=require('path');
exports.resolve=function resolve(dir){
  return path.join(__dirname,'..',dir)
}
exports.APP_PATH=exports.resolve('src')
exports.DIST_PATH=exports.resolve('dist')