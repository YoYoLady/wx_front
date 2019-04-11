// pages/evaluate_papers/evaluate_paper.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    curQuestion: {
      body: '认为公认的解决方法是最好的',
      options: [{
        op: 'A',
        content: '1、非常不像我         '
      }, {
        op: 'B',
        content: '2、中等程度的不像我    '
      }, {
        op: 'C',
        content: '3、有些想我又有些不像我 '
      }, {
        op: 'D',
        content: '4、中等程度的像我      '
      }, {
        op: 'F',
        content: '5、非常像我           '
      }
      ],
    },
    totalNum: 0,
    curNum: -1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})