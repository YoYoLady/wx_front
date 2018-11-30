// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  let { OPENID, APPID, UNIONID } = cloud.getWXContext();

  return db.collection('user_info').doc(OPENID).set({
    // data 字段表示需新增的 JSON 数据
    data: {
      user_name: event.nickName,
      gender: event.gender,
      wx_name: event.nickName,
      wx_openid: OPENID,
      wx_unionid: UNIONID,
      gmt_created: new Date(),
      gmt_modified: new Date(),
      edu_city: event.city,
      edu_province: event.province
    }
  })
    .then(res => {
      console.log(res)
    })

}