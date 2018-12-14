const app = getApp()

Page({
  data: {
  },
  beginHolland: function () {
    wx.navigateTo({
      url: '../holland/holland'
    })
  },
  beginMBTI: function () {
    wx.navigateTo({
      url: '../MBTI/MBTI'
    })
  },
  beginCompetence: function () {
    wx.navigateTo({
      url: '../competence/competence'
    })
  }
})