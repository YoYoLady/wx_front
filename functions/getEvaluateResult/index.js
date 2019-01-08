// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()


// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  var result = {};
  try {
    var hollandResult = await db.collection('new_user_answer').where({
      type: 'holland'
    }).orderBy('gmt_created', 'desc').limit(1).get();

    var gatbResult = await db.collection('new_user_answer').where({
      type: 'gatb'
    }).orderBy('gmt_created', 'desc').limit(1).get();

    var mbtiResult = await db.collection('new_user_answer').where({
      type: 'mbti'
    }).orderBy('gmt_created', 'desc').limit(1).get();

    if (hollandResult.data.length != 0) {
      var hresult = {}
      hresult.result_code = hollandResult.data[0].result_code;
      hresult.user_answer_gather = hollandResult.data[0].user_answer_gather;
      hresult.user_answer_detail = hollandResult.data[0].user_answer_detail;
      result.holland = hresult;
    }
    if (gatbResult.data.length != 0) {
      var hresult = {}
      hresult.result_code = gatbResult.data[0].result_code;
      hresult.user_answer_gather = gatbResult.data[0].user_answer_gather;
      hresult.user_answer_detail = gatbResult.data[0].user_answer_detail;
      result.gatb = hresult;
    }

    if (mbtiResult.data.length != 0) {
      var hresult = {}
      hresult.result_code = mbtiResult.data[0].result_code;
      hresult.user_answer_gather = mbtiResult.data[0].user_answer_gather;
      hresult.user_answer_detail = mbtiResult.data[0].user_answer_detail;
      result.mbti = hresult;
    }

    return result;

  } catch (err) {
    throw err;
  }




}