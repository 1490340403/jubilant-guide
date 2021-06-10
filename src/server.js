/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2021-04-19 09:42:14
 * @LastAuthor: 陈刚强
 * @LastTime: 2021-06-03 19:12:31
 * @message: 
 */
import mongoose from 'mongoose';
mongoose.set('useCreateIndex', true) 
const myDb="mongodb://localhost:27017/mySystem";
mongoose.connect(myDb, { useNewUrlParser: true,useUnifiedTopology: true });
mongoose.connection.on('connected',()=>{
  console.log('连接success')
})
mongoose.connection.on('disconnected',()=>{
  console.log('断开连接')
})
export default mongoose
