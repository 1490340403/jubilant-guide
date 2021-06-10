/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2021-04-25 15:54:47
 * @LastAuthor: 陈刚强
 * @LastTime: 2021-06-03 19:32:44
 * @message: 
 */
import {getValue} from '../redisConnect'
export const checkCaptcha=async(sId,code)=>{
  const result = await getValue(sId)
  console.log('sssss',result,code)
  return true
  console.log(result&&result.toUpperCase()===code.toUpperCase(),'s')
  if(result&&result.toUpperCase()==code.toUpperCase()){
    console.log('进来了')
    return true
  }else{
    return false
  }
}