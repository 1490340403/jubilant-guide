/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2021-05-20 20:20:20
 * @LastAuthor: 陈刚强
 * @LastTime: 2021-06-03 19:06:12
 * @message: 
 */
import mongoose from '../server'
const userSchema=new mongoose.Schema({
  username: { type: String, index: { unique: true }, sparse: true },
  password: { type: String },
  name: { type: String },
  created: { type: Date },
  updated: { type: Date },
  favs: { type: Number, default: 100 },
  gender: { type: String, default: '' },
  roles: { type: Array, default: ['user'] },
  pic: { type: String, default: '/img/header.jpg' },
  mobile: { type: String, match: /^1[3-9](\d{9})$/, default: '' },
  status: { type: String, default: '0' },
  regmark: { type: String, default: '' },
  location: { type: String, default: '' },
  isVip: { type: String, default: '0' },
  count: { type: Number, default: 0 }
})
const User=mongoose.model('user',userSchema)
export{
  User
}