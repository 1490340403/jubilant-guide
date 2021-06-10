/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2021-06-03 20:01:31
 * @LastAuthor: 陈刚强
 * @LastTime: 2021-06-06 09:27:52
 * @message: 
 */
import mongoose from '../server'
const signSchema =new mongoose.Schema({
  uid: { type: String, ref: 'users' },
  created: { type: Date },
  favs: { type: Number },
  count:{ type:Number}
})
signSchema.pre('save',function(next){
  this.created=new Date()
  next()
})
signSchema.statics={
  findByUid:function(uid){
    return this.findOne({uid:uid}).sort({created:-1})
  }
}
const Sign=mongoose.model('sign',signSchema)
export{
  Sign
}