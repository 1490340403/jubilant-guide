/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2021-04-13 09:18:35
 * @LastAuthor: 陈刚强
 * @LastTime: 2021-04-13 09:37:15
 * @message: 
 */
class errMsg{
  constructor(msg){
    this.code=400
    this.mag=msg
  }
}
class sucMsg{
  constructor(msg){
    this.data=msg
    this.code=200
  }
}
export default{
  errMsg,
  sucMsg
}