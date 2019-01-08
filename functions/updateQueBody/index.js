// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()

/**
 * 入参
 * {
 *     papertype: papertype,
 *     queId: _id,
 *     body:''
 *  }
 * 
 * 
 * */
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event);
  try {

    var newData = {};

    if (event.type == 'del') {
      newData = {
        is_valid: event.is_valid,
      };
    }
    if (event.type == 'mod') {
      newData = {
        question_body: event.question_body,
      };
    }
    switch (event.quetype) {
      case 'holland':
        await db.collection('holland_question').doc(event._id).update({
          data: newData
        });
        break;
      case 'mbti':
        await db.collection('MBTI_question').doc(event._id).update({
          data: newData
        });
        break;
      case 'gatb':
        await db.collection('competence_question').doc(event._id).update({
          data: newData
        });
        break;
    }
    return {
      result: true
    }
  } catch (error) {
    throw error;
  }


}