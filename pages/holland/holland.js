var that;
var app = getApp();

Page({
  
  data: {
    choseQuestionBank: 'holland_insteresting_evaluation',
    currentUserId: null,
    questionList:[],
    nowQuestion:[],
    choseCharacter:'',
    // blank:"blank",
    loading:true,
    currentQuestionNo: 0,
    totalQuestionNum: 40,
    initialNo: 100000,
    resultCount:{"R":0, "A":0, "I":0, "S":0, "E":0, "C":0},
    smallBatchNo: 0

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
    db.collection('question_bank_test').where({
        question_id: _.lte(that.data.initialNo + 20)
      }).get({
        success: function (res) {
          console.log(res.data)
          that.setData({
            questionList: res.data,
            nowQuestion: res.data[0],
            currentQuestionNo: 0,
            loading : false
          });
        }
    })
    
    
  },

  getNextQuestions: function (beginNum) {
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('question_bank_test').where({
      question_id: _.lte(beginNum + 21).and(_.gt(beginNum + 1))
    }).get({
      success: function (res) {
        console.log(res.data)
        var currentNo = that.data.currentQuestionNo + 1
        that.setData({
          questionList: res.data,
          nowQuestion: res.data[0],
          currentQuestionNo: currentNo
        });
      }
    })
  },

  onShow: function () {
  },

  chose : function(){
    var questionList = that.data.questionList
    var classCharacter = questionList[that.data.smallBatchNo].evaluation_attr
      // var score = that.data.score + 1;
      console.log(classCharacter)
      that.data.resultCount[classCharacter]++

      // TODO: 下个批次获取题目
    var currentQuestionNo = that.data.currentQuestionNo
    if (currentQuestionNo < that.data.totalQuestionNum - 1) {
      if (that.data.smallBatchNo < 19) {
        that.data.smallBatchNo = that.data.smallBatchNo + 1
        currentQuestionNo = currentQuestionNo + 1
        that.setData({
          nowQuestion: questionList[that.data.smallBatchNo],
          currentQuestionNo: currentQuestionNo,
        });
      } else {
        that.data.smallBatchNo = 0
        that.getNextQuestions(that.data.initialNo + currentQuestionNo)
      }
    } else {
      that.finishChose(currentQuestionNo);
    }
      
  },

  afterQuestion: function () {
    var currentQuestionNo = that.data.currentQuestionNo
    var questionList = that.data.questionList;
    var afterQuestionNumber = currentQuestionNo + 1;
    if (questionList[currentQuestionNo].attributes.answerResult==null){
      questionList[currentQuestionNo].attributes.answerResult = "blank";
      questionList[currentQuestionNo].attributes.userChose = "空";
      that.setData({
        nowQuestion: questionList[afterQuestionNumber],
        currentQuestionNo: afterQuestionNumber,
        questionList: questionList
      })
    }
    else if (questionList[currentQuestionNo].attributes.answerResult != null){
      that.setData({
        nowQuestion: questionList[afterQuestionNumber],
        currentQuestionNo: afterQuestionNumber,
      })
    }
    console.log(that.data.questionList)
  },

  answerCard:function(){
    getApp().globalData.singleChoiceAnswerNow = that.data.questionList,
    wx.navigateTo({
      url: '../answerCard/answerCard'
    });
  },

  finishChose : function(questionNumber){
    console.log(questionNumber)
    console.log(that.data.resultCount)
    wx.redirectTo({
      url: '../holland_result/holland_result'
    });
    
  }
 
})