// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const id = '';
// 云函数入口函数
exports.main = async(event, context) => {
  const {
    OPENID,
    APPID,
    UNIONID
  } = cloud.getWXContext();
  console.log("addData");
  console.log("addData");
  try {
    var exitUser = await db.collection('user_info').where({
      _id: OPENID
    }).get();
    console.log(event);
    var newData = {
      user_name: event.nickName,
      gender: event.gender,
      wx_name: event.nickName,
      wx_openid: OPENID,
      wx_unionid: UNIONID,
      gmt_created: new Date(),
      gmt_modified: new Date(),
      edu_city: event.city,
      edu_province: event.province,
      hasWeixinInfo: true
    };
    console.log("addData2");
    if (exitUser.data.length == 0) {
      newData._id=OPENID;
      console.log("addData3");
      await db.collection('user_info').add({
        // data 字段表示需新增的 JSON 数据
        data: newData
      })
    } else {
      console.log("addData4");
      await db.collection('user_info').doc(exitUser.data[0]._id).update({
        // data 字段表示需新增的 JSON 数据
        data: newData
      })
    }
    console.log("addData5");
    return newData;
  } catch (error) {
    throw error;
  }


}