/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2021-04-26 19:04:23
 * @LastAuthor: 陈刚强
 * @LastTime: 2021-06-10 15:40:44
 * @message: 
 */
import jwt from 'jsonwebtoken'
export const setToken=(username,secret='')=>{
  return new Promise((resolve,reject)=>{
    const token=jwt.sign(username,secret||'secret',{expiresIn:'1d'})
    resolve(token)
  }).catch(err=>{
    console.log(err)
  })
}
export const verifyToken=(token,secret='')=>{
  return new Promise((resolve,reject)=>{
    const userInfo=jwt.verify(token.split(' ')[1],secret||'secret')
    resolve(userInfo)
  }).catch(err=>{
    console.log(err)
  })
}