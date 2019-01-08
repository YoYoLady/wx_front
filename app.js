//app.js

var that = {};
App({
  globalData: {
    loginCode:'',
    userData: {
        userId:'',
        weixinName:'',
        weixinAvatarUrl:'',
        needWeixinInfo:true,
        canModifyPager:true,
    },
    userInfo: null,
    singleChoiceAnswerNow: [],
    choseQuestionBank: '',
    resultCode: '',
    hasAuthorized: false
  },

  onLaunch: function() {
    //监测用户使用
    wx.cloud.init({
      traceUser: true
    });
  },



})