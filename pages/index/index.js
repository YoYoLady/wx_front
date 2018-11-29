//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    head_title: '高中生专业倾向评测'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  finishUserInfo: function () {
    // wx.navigateTo({
    //   url: '../user_info/user_info'
    // }),
    
    wx.request({
      url: 'http://localhost:3000', //仅为示例，并非真实的接口地址
      data: {
        wx_id: 'yu2',
        user_id : '111',
        user_name : 'shengyu',
        wx_name : 'dfsa'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("res" + res)
        var output = "";
        for (var i in res) {
          var property = res[i];
          output += i + " = " + property + "\n";
        }
        console.log(output);
      }
    })
  },
  printObj: function (obj) {
    var output = "";
    for (var i in obj) {
      var property = obj[i];
      output += i + " = " + property + "\n";
    }
    console.log(output);
  },

  beginEvaluate: function () {
    wx.navigateTo({
      url: '../holland/holland'
    })
  }

})
