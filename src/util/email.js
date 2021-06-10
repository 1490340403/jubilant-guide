/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2021-04-15 09:07:50
 * @LastAuthor: 陈刚强
 * @LastTime: 2021-06-10 16:24:12
 * @message: 
 */
import  nodemailer  from "nodemailer"
import qs from 'qs'
async function send(sendInfo) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com', //qq邮箱
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "1490340403@qq.com", // 邮箱
      pass: 'pywjguutfcjhhieb', //授权码在后台产生
    },
  });
  let baseUrl =process.env.NODE_ENV==='development'?'http://www.imooc.com':'http://localhost:8080'
  const route = sendInfo.type === 'email' ? '/confirm' : '/reset'
  const url = `${baseUrl}/#${route}?` + qs.stringify(sendInfo.data)
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"认证邮件" <1490340403@qq.com>', // 发邮件账号
    to: sendInfo?.email, // 收邮件账号
    subject://标题
      sendInfo?.user !== ''
        ? `你好开发者，${sendInfo?.user}！《慕课网前端全栈实践》注册码`
        : '《慕课网前端全栈实践》注册码', // Subject line
    text: `您在《慕课网前端全栈实践》课程中注册，您的邀请码是${
      sendInfo?.code
    },邀请码的过期时间: ${sendInfo?.expire}`, // plain text body
    html: `
        <div style="border: 1px solid #dcdcdc;color: #676767;width: 600px; margin: 0 auto; padding-bottom: 50px;position: relative;">
        <div style="height: 60px; background: #393d49; line-height: 60px; color: #58a36f; font-size: 18px;padding-left: 10px;">Imooc社区——欢迎来到官方社区</div>
        <div style="padding: 25px">
          <div>您好，${sendInfo?.user}童鞋，重置链接有效时间30分钟，请在${
      sendInfo?.expire
    }之前重置您的密码：</div>
          <a href="${url}" style="padding: 10px 20px; color: #fff; background: #009e94; display: inline-block;margin: 15px 0;">立即重置密码</a>
          <div style="padding: 5px; background: #f2f2f2;">如果该邮件不是由你本人操作，请勿进行激活！否则你的邮箱将会被他人绑定。</div>
        </div>
        <div style="background: #fafafa; color: #b4b4b4;text-align: center; line-height: 45px; height: 45px; position: absolute; left: 0; bottom: 0;width: 100%;">系统邮件，请勿直接回复</div>
    </div>
    `, // html body
  })
 
  // console.log("Message sent: %s", info.messageId);
  // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  return info.messageId
}

export default send