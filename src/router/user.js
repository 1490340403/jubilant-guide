/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2021-06-10 11:29:42
 * @LastAuthor: 陈刚强
 * @LastTime: 2021-06-10 15:43:09
 * @message: 
 */

import Router from 'koa-router'
import user from '../api/user'
const router = new Router()
router.prefix('/user')
router.post('/updateInfo',user.uptUser)
router.post('/updateName',user.uptUserName)
module.exports =router