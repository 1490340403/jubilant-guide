/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2021-04-10 15:43:11
 * @LastAuthor: 陈刚强
 * @LastTime: 2021-06-10 11:31:14
 * @message: 
 */

const combineRouters=require('koa-combine-routers')
const commonRouter=require('./common')
const SignRouter=require('./sign')
const userRouter=require('./user')
module.exports = combineRouters(
  commonRouter,
  SignRouter,
  userRouter
  )