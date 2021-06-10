/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2021-04-22 09:25:03
 * @LastAuthor: 陈刚强
 * @LastTime: 2021-04-23 09:55:11
 * @message: 
 */
const redis = require("redis");
import { promisifyAll } from 'bluebird'//异步变成promise
const client = promisifyAll(redis.createClient({
  host: '127.0.0.1',
  port: 6379,
  password: '123456',
  detect_buffers: true
}))

client.on('error', (err) => {
  console.log('Redis Client Error:' + err)
})

const setValue = (key, value, time) => {
  if (typeof value === 'undefined' || value == null || value === '') {
    return
  }
  if (typeof value === 'string') {
    if (typeof time !== 'undefined') {
      client.set(key, value, 'EX', time)//设置过期时间
    } else {
      client.set(key, value)
    }
  } else if (typeof value === 'object') {
    // { key1: value1, key2: value2}
    // Object.keys(value) => [key1, key2]
    Object.keys(value).forEach((item) => {
      client.hset(key, item, value[item], redis.print)
    })
  }
}
const getValue = (key) => {
  return client.getAsync(key)
}
const getHValue = (key) => {
  return client.hgetallAsync(key)
}
const delValue = (key) => {
  client.del(key, (err, res) => {
    if (res === 1) {
      console.log('delete successfully');
    } else {
      console.log('delete redis key error:' + err)
    }
  })
}

export {
  client,
  setValue,
  getValue,
  getHValue,
  delValue
}
