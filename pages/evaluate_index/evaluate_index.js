const app = getApp()

Page({

  data: {

  },
  beginHolland: function () {
    wx.navigateTo({
      url: '../papers/paper?papertype=holland'
    })
  },
  beginMBTI: function () {
    wx.navigateTo({
      url: '../papers/paper?papertype=mbti'
    })
  },
  beginCompetence: function () {
    wx.navigateTo({
      url: '../papers/paper?papertype=gatb'
    })
  }
})