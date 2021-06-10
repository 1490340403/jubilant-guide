/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2021-04-10 15:52:46
 * @LastAuthor: 陈刚强
 * @LastTime: 2021-04-27 09:09:12
 * @message: 
 */
const Router=require('koa-router')
import Common from '../api/commonIndex'
const router=new Router();
router.prefix('/common')
//获取验证码
router.get('/getCaptcha',Common.getCaptcha)
router.post('/sendEmail',Common.sendEmail)
router.post('/register',Common.register)
router.post('/login',Common.login)
module.exports = router 