/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2021-04-08 22:12:40
 * @LastAuthor: 陈刚强
 * @LastTime: 2021-06-06 08:56:56
 * @message: 
 */
import koa from 'koa';
import helmet from 'koa-helmet' ;
import router  from './router' 
import cors  from 'koa2-cors';
import json from 'koa-json';
import koaBody from 'koa-body';
import compose from 'koa-compose';
import Jwt from 'koa-jwt'
import path from 'path'
import statics from 'koa-static';
import compress from 'koa-compress';
import error from './util/error'
import {verifyToken} from './util/token'
const app=new koa();
const isDevMode=process.env.NODE_ENV==='production'?false:true;

// app.use(async(ctx, next)=> {
//   console.log(ctx,'cccccc')
//   var token = ctx.headers.authorization;
//   console.log(ctx.headers.authorization,'token')
//   if(token == undefined){
//       await next();
//   }else{
//     verifyToken(token).then((data)=> {
//       //这一步是为了把解析出来的用户信息存入全局state中，这样在其他任一中间价都可以获取到state中的值
//           ctx.state = {
//               data:data
//           };
//       })
//       await next();
//   }
// })
const jwt = Jwt({ secret: 'secret'}).unless({ path: [/^\/public/, /\/login/,/\/common/], })
const middleware =compose(
  [
    koaBody(),
    statics(path.join(__dirname,'../public')),
    cors(),
    json({pretty:false,param:'pretty'}),
    helmet(),
    error,
    jwt
  ]
)
if(isDevMode){
  app.use(compress())
}
app.use(middleware)
app.use(router())
app.listen(3000,()=>{
  console.log('服务开启成功')
})