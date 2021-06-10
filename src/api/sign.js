/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2021-06-03 20:12:46
 * @LastAuthor: 陈刚强
 * @LastTime: 2021-06-10 14:11:30
 * @message: 
 */
import { Sign } from '../model/signModal'
import { User } from '../model/userModel'
import { verifyToken } from '../util/token'
import days from 'dayjs'
class Signs {
  async sign(ctx) {
    const token = ctx.headers.authorization
    const res = await verifyToken(token)

    let result;
    let newRecord;
    const record = await Sign.findOne({ uid: res._id }).sort({ created: -1 })
    if (!record) {
      newRecord = new Sign({
        uid: res._id,
        favs: 5,
        count: 1
      })

      await User.updateOne({ _id: res._id }, {
        // favs: 5,
        // count: 1
        $set: { count: 1 },
        $inc: { favs: 5 }
      })
      await newRecord.save()
      result = {
        favs: 5,
        count: 1,
        message: '请求成功',
      }
    } else {
      const now = days().subtract(1, 'days')
        .format('YYYY-MM-DD')
      const recordTime = days(record.created).format('YYYY-MM-DD')
      if (days(new Date()).format('YYYY-MM-DD') == recordTime) {
        ctx.body = {
          message: '您今天已经签到',
          favs: record.favs,
          count: record.count
        }
        return
      }
      if (recordTime == now) {
        newRecord = new Sign({
          uid: res._id,
          favs: record.favs + 5,
          count: record.count + 1
        })
        await User.updateOne({ _id: res._id }, {
          favs: record.favs + 5,
          count: record.count + 1
        })
        await newRecord.save()

        result = {
          favs: record.favs + 5,
          count: record.count + 1
        }
      } else {
        newRecord = new Sign({
          uid: res._id,
          favs: record.favs + 5,
          count: 1
        })
        await User.updateOne({ _id: res._id }, {
          count: 1,
          favs: record.favs + 5
        })
        await newRecord.save()

        result = {
          favs: record.favs + 5,
          count: 1
        }
      }
    }
    ctx.body = {
      code: 200,
      ...result,
    }
  }
}
export default new Signs()