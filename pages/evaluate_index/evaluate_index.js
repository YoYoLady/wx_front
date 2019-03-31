const app = getApp()

Page({

  tabBar: {
    "color": "#9E9E9E",
    "selectedColor": "#f00",
    "backgroundColor": "#fff",
    "borderStyle": "#ccc",
    "list": [{
      "pagePath": "/pages/index/index",
      "text": "主页",
      "iconPath": "../../images/index.png",
      "selectedIconPath": "../../images/index_active.png",
      "pageTum": "redirect",
      "selectedColor": "#4EDF80",
      active: true
    },
    {
      "pagePath": "/pages/tum/tum",
      "text": "其他",
      "iconPath": "../../images/pageTum.png",
      "pageTum": "navigate",
      "selectedColor": "#4EDF80",
      active: false
    },
    {
      "pagePath": "/pages/mine/mine",
      "text": "我的",
      "iconPath": "../../images/mine.png",
      "selectedIconPath": "../../images/mine_active.png",
      "pageTum": "redirect",
      "selectedColor": "#4EDF80",
      active: false
    }],
    "position": "bottom"
  },


  data: {

  },

  onLoad:function() {
    wx.showTabBar({
      animation: false //是否需要过渡动画
    })
  },

  beginHolland: function() {
    var timestamp = Date.parse(new Date());
    console.log("time " + timestamp);
    wx.navigateTo({
      url: '../papers/paper?papertype=holland'
    })
  },
  beginMBTI: function() {
    wx.navigateTo({
      url: '../papers/paper?papertype=mbti'
    })
  },
  beginCompetence: function() {
    wx.navigateTo({
      url: '../papers/paper?papertype=gatb'
    })
  }
  
})