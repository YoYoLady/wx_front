//index.js
//获取应用实例
const app = getApp()
var that = {};
Page({
  data: {
    motto: 'Hello World',
    head_title: '高中生专业倾向评测'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },


  onLoad: function() {
    that = this;
  },

  //完善用户信息
  finishUserInfo: function() {
    wx.navigateTo({
      url: '../user_info/user_info'
    })
  },

  printObj: function(obj) {
    var output = "";
    for (var i in obj) {
      var property = obj[i];
      output += i + " = " + property + "\n";
    }
    console.log(output);
  },

  //开始评测 
  beginEvaluate: function() {
    wx.navigateTo({
      url: '../evaluate_index/evaluate_index'
    })
  },

  //评测报告
  resultReport: function() {
    wx.navigateTo({
      url: '../paperresult/paperresult?showall=true',
    });
  },

  onShareAppMessage() {

  }

})