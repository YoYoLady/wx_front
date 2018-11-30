// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let { OPENID, APPID, UNIONID } = cloud.getWXContext();

  return db.collection('user_answer').doc(OPENID).get({
    success: function (res) {
      console.log(res.data)
      // res.data 包含该记录的数据
      if (res.data.length > 0) {
        return {result_code : res.data[0].result_code}
      }
      
    }
  })
}