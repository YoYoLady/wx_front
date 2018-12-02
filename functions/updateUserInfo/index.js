// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let { OPENID, APPID, UNIONID } = cloud.getWXContext();

  var updateData = { gmt_modified: new Date()}
  if ('edu_school' in event) {
    updateData['edu_school'] = event.edu_school;
  }
  if ('mobile' in event) {
    updateData['mobile'] = event.mobile;
  }
  if ('edu_grade' in event) {
    updateData['edu_grade'] = event.edu_grade;
  }

  return db.collection('user_info').doc(OPENID).update({
    // data 字段表示需新增的 JSON 数据
    data: updateData
  })
    .then(res => {
      console.log(res)
    })

}