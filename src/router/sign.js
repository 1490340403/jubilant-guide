/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2021-06-03 20:09:53
 * @LastAuthor: 陈刚强
 * @LastTime: 2021-06-10 11:29:36
 * @message: 
 */
import sign from '../api/sign'
const Router=require('koa-router')
const router=new Router();

router.prefix('/sign')
router.get('/fav',sign.sign)
module.exports=router