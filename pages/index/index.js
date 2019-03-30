//index.js
//获取应用实例
const app = getApp()
var that = {};
Page({
  data: {
    motto: 'Hello World',
    head_title: '首页',
    
    swiperCurrent: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 800,
    circular: true,
    imgUrls: [
      'https://6576-evaluation-f7a0aa-1258155208.tcb.qcloud.la/轮播图1.jpg',
      '../../images/1.0/轮播图2.jpg'
    ],
    links: [
      '../user/user',
      '../user/user',
      '../user/user'
    ]


  },

  //轮播图的切换事件
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //点击指示点切换
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  //点击图片触发事件
  swipclick: function (e) {
    console.log(this.data.swiperCurrent);
    wx.switchTab({
      url: this.data.links[this.data.swiperCurrent]
    })
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
