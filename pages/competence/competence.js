var that;
var app = getApp();

Page({

  data: {
    choseQuestionBank: 'competence_evaluation',
    currentUserId: null,
    questionList: [],
    nowQuestion: [],
    choseCharacter: '',
    // blank:"blank",
    loading: true,
    currentQuestionNo: 0,
    totalQuestionNum: 39,
    initialNo: 0,
    resultCount: {
      "一般学习能力": 0,
      "言语能力倾向": 0,
      "计算能力倾向": 0,
      "空间判断能力": 0,
      "形态知觉": 0,
      "职员能力倾向": 0,
      "眼手运动协调":0,
      "手指灵巧":0
    },
    answerDetail: {},
    smallBatchNo: 0,
    options: [],
    weight: {"A":1, "B":2, "C":3, "D":4, "E":5}
  },

  genOptions: function (optionsStr) {
    var curOptions = optionsStr.split(';')
    var ret = []
    curOptions.forEach((data) => {
      var arr = data.split(':')
      var one = { "index": arr[0], "body": arr[1] }
      ret.push(one);
    });
    return ret;
  },

  onLoad: function () {
    that = this;
    var choseQuestionBank = getApp().globalData.choseQuestionBank;
    that.setData({
      choseQuestionBank: choseQuestionBank
    });

    // 初始化第一批题目
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('competence_question').where({
      question_id: _.lte(that.data.currentQuestionNo + 20)
    }).get({
      success: function (res) {

        var curOptions = that.genOptions(res.data[0].question_options)
        that.setData({
          questionList: res.data,
          nowQuestion: res.data[0],
          currentQuestionNo: 0,
          loading: false,
          options: curOptions
        });
      }
    })


  },

  getNextQuestions: function (beginNum, userAnswer) {
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('competence_question').where({
      question_id: _.lte(beginNum + 21).and(_.gt(beginNum + 1))
    }).get({
      success: function (res) {
        //console.log(res.data)
        var curOptions = that.genOptions(res.data[0].question_options)
        var currentNo = that.data.currentQuestionNo + 1
        that.setData({
          questionList: res.data,
          nowQuestion: res.data[0],
          currentQuestionNo: currentNo,
          answerDetail: userAnswer,
          options: curOptions
        });
      }
    })
  },

  chose: function (e) {
    var index = e.currentTarget.dataset.text
    console.log("选择：" + index)
    var questionList = that.data.questionList
    var classCharacter = questionList[that.data.smallBatchNo].Competence_type
    // var score = that.data.score + 1;

    var value = that.data.weight[index]
    that.data.resultCount[classCharacter] += value


    var userAnswer = that.data.answerDetail
    var currentQuestionId = questionList[that.data.smallBatchNo].question_id
    userAnswer[currentQuestionId] = index

    // TODO: 下个批次获取题目
    var currentQuestionNo = that.data.currentQuestionNo
    if (currentQuestionNo < that.data.totalQuestionNum - 1) {
      if (that.data.smallBatchNo < 19) {
        that.data.smallBatchNo = that.data.smallBatchNo + 1
        currentQuestionNo = currentQuestionNo + 1
        var curOptions = that.genOptions(questionList[that.data.smallBatchNo].question_options)
        that.setData({
          nowQuestion: questionList[that.data.smallBatchNo],
          currentQuestionNo: currentQuestionNo,
          answerDetail: userAnswer,
          options: curOptions
        });
      } else {
        that.data.smallBatchNo = 0
        that.getNextQuestions(that.data.initialNo + currentQuestionNo, userAnswer)
        console.log(that.data.resultCount)
      }
    } else {
      that.finishChose(currentQuestionNo);
    }

  },

  getResultCode: function (obj) {
    var arr = []
    for (var i in obj) {
      arr.push(obj[i] + i);
    }
    arr = arr.sort(function (a, b) {
      var aNum = parseInt(a, 10)
      var bNum = parseInt(b, 10)
      return aNum - bNum
    })
    console.log('arr' + arr)
    var length = arr.length

    var ret = arr[length - 1].match((/[a-z]/ig))[0]
    ret += arr[length - 2].match((/[a-z]/ig))[0]
    ret += arr[length - 3].match((/[a-z]/ig))[0]
    console.log(ret)
    return ret
  },

  finishChose: function (questionNumber) {
    console.log(questionNumber)
    console.log(that.data.resultCount)
    console.log(that.data.answerDetail)
    var resultCode = '待定'

    // 调用云函数存入user answer
    wx.cloud.callFunction({
      // 云函数名称
      name: 'updateUserAnswer',
      // 传给云函数的参数
      data: {
        result_code: resultCode,
        user_answer_gather: that.data.resultCount,
        user_answer_detail: that.data.answerDetail
      }
    })
      .then(res => {
        console.log("call upload user answer success!")
        console.log(res.result) // 3
      })
      .catch(console.error)



    wx.redirectTo({
      url: '../holland_t/hollandsult?resultCode=' + resultCode
    });

  }

})