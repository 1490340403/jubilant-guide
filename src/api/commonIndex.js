/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2021-04-13 19:44:32
 * @LastAuthor: 陈刚强
 * @LastTime: 2021-06-06 14:52:29
 * @message: 
 */
import svgCaptcha from 'svg-captcha'
import msg from '../util/msg'
import send from '../util/email'
import {User} from '../model/userModel'
import {checkCaptcha} from '../util/checkCaptcha'
import {setValue,getValue} from '../redisConnect'
import {setToken} from '../util/token'
const captchaParams = {
  size: 4, // 验证码长度
  width: 160,
  height: 35,
  fontSize: 50,
  ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
  noise: 2, // 干扰线条的数量
  color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
  background: '#eee' // 验证码图片背景颜色
}
let captcha = ''
class Common {
  getCaptcha(ctx) {
    const { isSum,sId } = ctx.query
    if (isSum) {
      captcha = svgCaptcha.createMathExpr({
        ...captchaParams
      })
    } else {
      captcha = svgCaptcha.create({
        ...captchaParams
      })
    }
    setValue(sId,captcha.text,10*60)//植入redis
    ctx.body = new msg.sucMsg(captcha)
  }
  async sendEmail(ctx) {
    const params = {
      user: '小白',
      email: "1490340403@qq.com",
      code: '1234',
      expires: '2021-05-12'
    }
    const data = await send(params)
    ctx.body = new msg.sucMsg(data)
  }
  async register (ctx){
     const params=ctx.request.body
    const result=await checkCaptcha(params.sId,params.code)
    if(result){
      const data=await User.create(params)
      ctx.body=new msg.sucMsg(data)
    }
  }
 async login(ctx){
    const params=ctx.request.body
    const result=await checkCaptcha(params.sId,params.code)
    if(result){
      const data=await User.findOne({username:params.username,password:params.password})
      if(data){
        const token=await setToken({ _id: data._id })
        const res={
          ...data.toJSON(),
          token
        }
        ctx.body=new msg.sucMsg(res)
      }else{
        ctx.body=new msg.errMsg("密码或者账号不对")
      }
    }else{
      ctx.body=new msg.errMsg("验证码输入不对")
    }
  }
}

export default new Common()