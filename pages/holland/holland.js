var that;
var app = getApp();

Page({

  data: {
    choseQuestionBank: 'holland_insteresting_evaluation',
    currentUserId: null,
    questionList: [],
    nowQuestion: [],
    choseCharacter: '',
    // blank:"blank",
    loading: true,
    currentQuestionNo: 0,
    totalQuestionNum: 120,
    initialNo: 100000,
    resultCount: {
      "R": 0,
      "A": 0,
      "I": 0,
      "S": 0,
      "E": 0,
      "C": 0
    },
    answerDetail: {},
    smallBatchNo: 0

  },


  onLoad: function() {
    that = this;
    var choseQuestionBank = getApp().globalData.choseQuestionBank;
    that.setData({
      choseQuestionBank: choseQuestionBank
    });

    // 初始化第一批题目
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('question_bank_test').where({
      question_id: _.lte(that.data.initialNo + 20)
    }).get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          questionList: res.data,
          nowQuestion: res.data[0],
          currentQuestionNo: 0,
          loading: false
        });
      }
    })


  },

  getNextQuestions: function(beginNum, userAnswer) {
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('question_bank_test').where({
      question_id: _.lte(beginNum + 21).and(_.gt(beginNum + 1))
    }).get({
      success: function(res) {
        console.log(res.data)
        var currentNo = that.data.currentQuestionNo + 1
        that.setData({
          questionList: res.data,
          nowQuestion: res.data[0],
          currentQuestionNo: currentNo,
          answerDetail: userAnswer
        });
      }
    })
  },

  onShow: function() {},

  choseOptionA: function() {
    that.chose(1)
  },

  choseOptionB: function() {
    that.chose(0)
  },

  chose: function(option_value) {
    var questionList = that.data.questionList
    var classCharacter = questionList[that.data.smallBatchNo].evaluation_attr
    // var score = that.data.score + 1;
    if (option_value == 1) {
      that.data.resultCount[classCharacter]++
    }

    var userAnswer = that.data.answerDetail
    var currentQuestionId = questionList[that.data.smallBatchNo].question_id
    userAnswer[currentQuestionId] = option_value

    // TODO: 下个批次获取题目
    var currentQuestionNo = that.data.currentQuestionNo
    if (currentQuestionNo < that.data.totalQuestionNum - 1) {
      if (that.data.smallBatchNo < 19) {
        that.data.smallBatchNo = that.data.smallBatchNo + 1
        currentQuestionNo = currentQuestionNo + 1
        that.setData({
          nowQuestion: questionList[that.data.smallBatchNo],
          currentQuestionNo: currentQuestionNo,
          answerDetail: userAnswer
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

  afterQuestion: function() {
    var currentQuestionNo = that.data.currentQuestionNo
    var questionList = that.data.questionList;
    var afterQuestionNumber = currentQuestionNo + 1;
    if (questionList[currentQuestionNo].attributes.answerResult == null) {
      questionList[currentQuestionNo].attributes.answerResult = "blank";
      questionList[currentQuestionNo].attributes.userChose = "空";
      that.setData({
        nowQuestion: questionList[afterQuestionNumber],
        currentQuestionNo: afterQuestionNumber,
        questionList: questionList
      })
    } else if (questionList[currentQuestionNo].attributes.answerResult != null) {
      that.setData({
        nowQuestion: questionList[afterQuestionNumber],
        currentQuestionNo: afterQuestionNumber,
      })
    }
    console.log(that.data.questionList)
  },

  answerCard: function() {
    getApp().globalData.singleChoiceAnswerNow = that.data.questionList,
      wx.navigateTo({
        url: '../answerCard/answerCard'
      });
  },

  getResultCode: function(obj) {
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

  finishChose: function(questionNumber) {
    console.log(questionNumber)
    console.log(that.data.resultCount)
    console.log(that.data.answerDetail)
    var resultCode = that.getResultCode(that.data.resultCount)

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
      url: '../holland_result/holland_result?resultCode=' + resultCode
    });

  }

})