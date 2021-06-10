/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2021-04-26 19:58:43
 * @LastAuthor: 陈刚强
 * @LastTime: 2021-04-26 20:11:27
 * @message: 
 */
import {verifyToken} from './token'
export default async(ctx, next)=> {
    var token = ctx?.headers.authorization;
    if (token == undefined) {
      await next();
    } else {
      verifyToken.verToken(token).then((data) => {
        //这一步是为了把解析出来的用户信息存入全局state中，这样在其他任一中间价都可以获取到state中的值
        ctx.state = {
          data: data
        };
      })
      await next();
    }
}