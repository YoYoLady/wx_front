var that;


Page({
  

  data: {
    choseQuestionBank: '',
    currentUserId: null,
    questionList:[],
    nowQuestion:[],
    nowQuestionNumber:'',
    choseCharacter:'',
    score:0,
    // blank:"blank",
    newMultiQuestionList:[],
    loading:true
  },

  
  onLoad: function () {
    that = this;
    var choseQuestionBank = getApp().globalData.choseQuestionBank;
    that.setData({
      choseQuestionBank: choseQuestionBank
    });
    //var currentUser = Bmob.User.current();
    //var currentUserId = getApp.userInfo.id
    var choseQuestionBank = that.data.choseQuestionBank;
    var loadQuestionBank;
    var questionList=new Array();
    if (choseQuestionBank != ""){
      loadQuestionBank="holland";
      console.log("holland insteresting test!");
    }
    var newSingleQuestionList = [{title : '是否装配修理电器或玩具', options : ['是', '否'], attributes : {}},
        {title : '修理自行车 ', options : ['是', '否'], attributes : {}}]
    that.setData({
        questionList: newSingleQuestionList,
        nowQuestion: newSingleQuestionList[0],
        nowQuestionNumber:0,
        loading : false
    });
    // var QuestionBank = Bmob.Object.extend(loadQuestionBank);
    // var querySingleQuestionBank = new Bmob.Query(QuestionBank);
    // querySingleQuestionBank.equalTo("type", "SC");
    // querySingleQuestionBank.find({
    //   success: function (results) {
    //     console.log("共查询到 " + results.length + " 条记录");
    //     for (var i = 0; i < results.length; i++) {
    //       questionList.push(results[i])
    //       questionList[i].attributes.userChose = "空";
    //     }
    //     var newSingleQuestionList = that.getRandomSingleChoice(questionList,20)
    //     that.setData({
    //       questionList: newSingleQuestionList,
    //       nowQuestion: newSingleQuestionList[0],
    //       nowQuestionNumber:0
    //     });
    //   },
    //   error: function (error) {
    //     console.log("查询失败: " + error.code + " " + error.message);
    //   }
    // });


  },


  onShow: function () {
  
  },

  choseA:function(){
      var questionList = that.data.questionList;
      var nowQuestionNumber = that.data.nowQuestionNumber;
      getApp().globalData.score++;
      // var score = that.data.score + 1;
      questionList[nowQuestionNumber].attributes.answerResult = "correct";
      questionList[nowQuestionNumber].attributes.userChose = "A";
      that.setData({
        questionList: questionList,
        choseCharacter: "A",
        // score:score,
      });
      that.nextQuestion = setTimeout(function () {
        if (nowQuestionNumber==1){
          that.setData({
            nowQuestion: questionList[nowQuestionNumber],
            nowQuestionNumber: nowQuestionNumber,
          });
        }
        else if (nowQuestionNumber != 1){
          var nextQuestionNumber = nowQuestionNumber + 1; 
          that.setData({
            nowQuestion: questionList[nextQuestionNumber],
            nowQuestionNumber: nextQuestionNumber,
          });
        }
      }, 300);
      that.overSingleChoice(nowQuestionNumber);
  },

  // frontQuestion:function(){
  //   var questionList = that.data.questionList;
  //   var frontQuestionNumber = that.data.nowQuestionNumber-1;
  //   that.setData({
  //     nowQuestion: questionList[frontQuestionNumber],
  //     nowQuestionNumber: frontQuestionNumber,
  //   })
  //   console.log(that.data.questionList)
  // },

  afterQuestion: function () {
    var nowQuestionNumber = that.data.nowQuestionNumber
    var questionList = that.data.questionList;
    var afterQuestionNumber = nowQuestionNumber + 1;
    if (questionList[nowQuestionNumber].attributes.answerResult==null){
      questionList[nowQuestionNumber].attributes.answerResult = "blank";
      questionList[nowQuestionNumber].attributes.userChose = "空";
      that.setData({
        nowQuestion: questionList[afterQuestionNumber],
        nowQuestionNumber: afterQuestionNumber,
        questionList: questionList
      })
    }
    else if (questionList[nowQuestionNumber].attributes.answerResult != null){
      that.setData({
        nowQuestion: questionList[afterQuestionNumber],
        nowQuestionNumber: afterQuestionNumber,
      })
    }
    console.log(that.data.questionList)
  },

  answerCard:function(){
    getApp().globalData.singleChoiceAnswerNow = that.data.questionList,
    getApp().globalData.multiChoiceAnswerNow = that.data.newMultiQuestionList;
    wx.navigateTo({
      url: '../answerCard/answerCard'
    });
  },

  overSingleChoice:function(questionNumber){
    getApp().globalData.singleChoiceAnswerNow = that.data.questionList;
    getApp().globalData.multiChoiceAnswerNow = that.data.newMultiQuestionList;
    if (questionNumber==1){
      wx.redirectTo({
        url: '../holland_result/holland_result'
      });
    }
  }
 
})