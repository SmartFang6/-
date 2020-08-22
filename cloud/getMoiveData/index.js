// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const axios = require('axios')
let httpUrl = 'http://film.glkjjt.com/api';

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)

  // let result = await axios.get(httpUrl+event.api,{params:event.params});
  return event
}