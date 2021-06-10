/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2021-06-10 11:38:12
 * @LastAuthor: 陈刚强
 * @LastTime: 2021-06-10 16:28:16
 * @message: 
 */
import {User} from '../model/userModel'
import moment from 'dayjs'
import {setValue,getValue} from '../redisConnect'
import {verifyToken,setToken} from '../util/token'
import send from '../util/email'
class Users {
  async uptUser(ctx) {
    const token=ctx.headers.authorization
    const res=await verifyToken(token)
    const result=await User.findOne({ _id: res._id })
    if (process.env.NODE_ENV === 'production') {
      console.log('生产环境');
  }
   
  if (process.env.NODE_ENV === 'development') {
      console.log('开发环境');
  }
    const params=ctx.request.body
    // if(params.username)
    if(params.username&&params.username!==result.username){
      // setToken({_id:res._id},'reset')
      setValue('reset','reset',30*60)
      console.log('进来了。。。。')
      const info={
        email:"1490340403@qq.com",
        data:{
          username:params.username,
          key:"reset"
        },
        type:'email',
        user:result.username,
        code:200,
        expire:  moment()
        .add(30, 'minutes')
        .format('YYYY-MM-DD HH:mm:ss'),
      }
      send(info)
    }
    const data=await User.updateOne({_id:res._id},params)

    console.log('res....',ctx.request.body,result)
     ctx.body={
       code:200,
       data
     }
  }
  async uptUserName(ctx){
    const token=ctx.headers.authorization
    const isTrue=await getValue('reset')
    const res=await verifyToken(token)
    ctx.body={
      code:200,
      isTrue:isTrue=='reset'?true:false
    }
    console.log(res,'res------',isTrue)
  }
}
export default new Users