// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  let {
    OPENID,
    APPID,
    UNIONID
  } = cloud.getWXContext();
  try {
    await db.collection('new_user_answer').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        wx_openid: OPENID,
        gmt_created: new Date().getMilliseconds(),
        gmt_modified: new Date().getMilliseconds(),
        date_created: new Date(),
        date_modified: new Date(),
        result_code: event.result_code,
        user_answer_gather: event.user_answer_gather,
        user_answer_detail: event.user_answer_detail,
        type: event.type
      }
    });
    return {
      result: true
    }
  } catch (error) {
    throw error;
  }

}