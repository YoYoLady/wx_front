// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let { OPENID, APPID, UNIONID } = cloud.getWXContext();
  

  return db.collection('user_answer').doc(OPENID).set({
    // data 字段表示需新增的 JSON 数据
    data: {
      _id: OPENID,
      wx_openid: OPENID,
      wx_unionid: UNIONID,
      gmt_created: new Date(),
      gmt_modified: new Date(),
      result_code: event.result_code,
      user_answer_gather: event.user_answer_gather,
      user_answer_detail: event.user_answer_detail
    }
  })
    .then(res => {
      console.log(res)
    })
}