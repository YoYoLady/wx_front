// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
/*
入参
{
     papertype: papertype,
      queIndex: 1,
      size: 20,
}
返回值
  * {
   * prop:{
   * totoalNum:100,
   *  factorArr:[
   *    'fatorA','fatorB','fatorC','fatorS',
   *  ]
   *
   * },
   * pager:[{
   * _id:''
   * body:'这是一个题目描述',
   * options:'A:选项1;B:选项2;C:选项3;D:选项4;',
   * weights:'A:J,1;B:P,1;C:H,1;D:L,1',
   * queIndex:10
   * }]
   *
   * }


**/

exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const _ = db.command
  var factorArr = null;
  var totoalNum = null;
  var j;
  var len;
  var dbCount;
  var questions;
  var result = {};
  var weightStr;
  var pager = [];


  try {
    switch (event.papertype) {
      case 'holland':
        if (event.queIndex == 1) {
          dbCount = await db.collection('holland_question').where({
            is_valid: _.eq(null).or(_.eq(1))
          }).count();
          totoalNum = dbCount.total;
          factorArrs = [{
              factor: 'R',
              des: '操作型'
            },
            {
              factor: 'A',
              des: '艺术型'
            },
            {
              factor: 'I',
              des: '研究型'
            },
            {
              factor: 'S',
              des: '社会型'
            },
            {
              factor: 'E',
              des: '管理型'
            },
            {
              factor: 'C',
              des: '事务型'
            }
          ];
          result.prop = {
            totalNum: totoalNum,
            factorArr: factorArrs
          };
        }

        questions = await db.collection('holland_question').where({
          question_id: _.gte(event.queIndex),
          is_valid: _.eq(null).or(_.eq(1))
        }).orderBy('question_id', 'asc').limit(event.size).get();

        for (j = 0, len = questions.data.length; j < len; j++) {
          weightStr = '';
          //1:1;2:2;3:3;4:4;5:5=>1:R,1;2:R,2;3:R,3;4:R,4;5:R,5;
          questions.data[j].weight.split(';').forEach((weightarr) => {
            //1:1=> 1:R,1;
            var arr = weightarr.split(':')
            weightStr = weightStr + arr[0] + ':' + questions.data[j].class_letter + ',' + arr[1] + ';';
          });

          pager[j] = {
            _id: questions.data[j]._id,
            body: questions.data[j].question_body,
            options: questions.data[j].question_options,
            weights: weightStr,
            queIndex: questions.data[j].question_id
          }

        }

        break;
      case 'mbti':
        if (event.queIndex == 1) {
          dbCount = await db.collection('MBTI_question').where({
            is_valid: _.eq(null).or(_.eq(1))
          }).count();
          totoalNum = dbCount.total;
          factorArr = [{
              factor: 'E',
              des: '外向'
            },
            {
              factor: 'I',
              des: '内向'
            },
            {
              factor: 'S',
              des: '实感'
            },
            {
              factor: 'N',
              des: '直觉'
            },
            {
              factor: 'T',
              des: '思考'
            },
            {
              factor: 'F',
              des: '情感'
            },
            {
              factor: 'J',
              des: '判断'
            },
            {
              factor: 'P',
              des: '知觉'
            }
          ];
          result.prop = {
            totalNum: totoalNum,
            factorArr: factorArr
          };
        }

        questions = await db.collection('MBTI_question').where({
          question_id: _.gte(event.queIndex),
          is_valid: _.eq(null).or(_.eq(1))
        }).orderBy('question_id', 'asc').limit(event.size).get()
        console.log(questions.data);
        for (j = 0, len = questions.data.length; j < len; j++) {
          weightStr = '';
          //:E-A:1,B:0;I-A:0,B:1=>A:E,1;B:I,1;
          questions.data[j].weight.split(';').forEach((data) => {
            var arr = data.split('-');
            var factor = arr[0];
            // A:1,B:0 arr[1]
            var option = '';
            var count = '';

            arr[1].split(',').forEach((data2) => {
              if (data2.search('1') != -1) {
                option = data2.split(':')[0];
                count = '1';
              }
            })
            //1:1=> 1:R,1;
            weightStr = weightStr + option + ':' + factor + ',' + count + ';';
          });

          queBody = '';
          if (questions.data[j].body == null || questions.data[j].body == '') {
            queBody = questions.data[j].question_lead;
          } else {
            queBody = questions.data[j].question_body;
          }
          pager[j] = {
            _id: questions.data[j]._id,
            body: queBody,
            options: questions.data[j].question_options,
            weights: weightStr,
            queIndex: questions.data[j].question_id
          }

        }
        break;
      case 'gatb':
        if (event.queIndex == 1) {
          dbCount = await db.collection('competence_question').where({
            is_valid: _.eq(null).or(_.eq(1))
          }).count();
          totoalNum = dbCount.total;
          factorArr = [{
              factor: '一般学习能力',
              des: '一般学习能力'
            },
            {
              factor: '言语能力倾向',
              des: '言语能力倾向'
            },
            {
              factor: '计算能力倾向',
              des: '计算能力倾向'
            },
            {
              factor: '空间判断能力',
              des: '空间判断能力'
            },
            {
              factor: '形态知觉',
              des: '形态知觉'
            },
            {
              factor: '职员能力倾向',
              des: '职员能力倾向'
            },
            {
              factor: '眼手运动协调',
              des: '眼手运动协调'
            },
            {
              factor: '手指灵巧',
              des: '手指灵巧'
            },{
              factor: '手的灵巧',
              des: '手的灵巧'
            }
          ];
          result.prop = {
            totalNum: totoalNum,
            factorArr: factorArr
          };
        }

        questions = await db.collection('competence_question').where({
          question_id: _.gte(event.queIndex),
          is_valid: _.eq(null).or(_.eq(1))
        }).orderBy('question_id', 'asc').limit(event.size).get()

        for (j = 0, len = questions.data.length; j < len; j++) {
          var weightStr = '';
          //1:1;2:2;3:3;4:4;5:5=>1:R,1;2:R,2;3:R,3;4:R,4;5:R,5;
          questions.data[j].weight.split(',').forEach((weightarr) => {
            //1:1=> 1:R,1;
            var arr = weightarr.split(':')
            weightStr = weightStr + arr[0] + ':' + questions.data[j].Competence_type + ',' + arr[1] + ';';
          });

          pager[j] = {
            _id: questions.data[j]._id,
            body: questions.data[j].question_body,
            options: questions.data[j].question_options,
            weights: weightStr,
            queIndex: questions.data[j].question_id
          }

        }
        break;
      default:
        throw '未知试卷类型' + event.papertype

    }

    result.pager = pager;
    return result;
  } catch (error) {
    throw error
  }

}