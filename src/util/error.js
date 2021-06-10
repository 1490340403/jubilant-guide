/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2021-04-25 17:04:26
 * @LastAuthor: 陈刚强
 * @LastTime: 2021-04-25 17:04:26
 * @message: 
 */
export default (ctx, next) => {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: 'Protected resource, use Authorization header to get access\n'
      }
    } else {
      debugger
      ctx.status = err.status || 500
      ctx.body = Object.assign({
        code: 500,
        msg: err.message,
      }, process.env.NODE_ENV === 'development' ?
        { stack: err.stack } : {})
      // console.log(err.stack);
    }
  });
}