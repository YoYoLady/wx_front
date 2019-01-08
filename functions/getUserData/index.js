// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID, APPID, UNIONID } = cloud.getWXContext();
  var userData={};
  console.log(event)
  console.log("getUserData");
  var res = await db.collection('user_info').where({
    wx_openid: OPENID
  }).get();
  console.log("getUserData1");
  if (res.data !== undefined)  {
    console.log("getUserData2");
    if (res.data.length==0){
      console.log("getUserData3");
      userData = {
        _id: OPENID,
        wx_openid: OPENID,
        wx_unionid: UNIONID,
        gmt_created: new Date(),
        gmt_modified: new Date(),
        hasWeixinInfo: false
      };
      await db.collection('user_info').add({
        // data 字段表示需新增的 JSON 数据
        data: userData
      });
    }else{
      userData=res.data[0];
    }

  } else {
    console.log("查询出错");
    console.log(res);
  }
  

  //返回最后的数据
  return userData

}