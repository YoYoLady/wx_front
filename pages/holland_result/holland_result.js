var that;
var app = getApp();

Page({

  data : {
    resultCode : '',
    resultDesc : ''
  },

onShow: function () {

},
getAllArrayCode : function(code) {
  var ret = []
  ret.push(code)
  var one = code.substr(0, 1)
  var two = code.substr(1, 1)
  var three = code.substr(2, 1)
  ret.push(one + three + two)
  ret.push(two + one + three)
  ret.push(two + three + one)
  ret.push(three + one + two)
  ret.push(three + two + one)
  console.log(ret)
  return ret
},

onLoad : function(options) {
  that = this;
  var desc = ''
  if (Object.keys(options).length == 0) {
    that.setData({
      resultDesc: '请先评测！'
    });
    return 
  }

  var resultCode = options.resultCode
  
  console.log("holland result code:" + resultCode)
  // 获取结果
  const db = wx.cloud.database()
  const _ = db.command
  
  db.collection('answer_bank_test').where({
    answer_code: _.eq(resultCode)
  }).get({
    success: function (res) {
      console.log(res.data)
      if (res.data.length == 0) {
        desc = '请先评测！'
      } else {
        desc = res.data[0].answer_desc
      }
      that.setData({
        resultCode: resultCode,
        resultDesc: desc
      });
    }
  })


},

finishEvaluate: function () {

  wx.redirectTo({
    url: '../index/index'
  });
}

})