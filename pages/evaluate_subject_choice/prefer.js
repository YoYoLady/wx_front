// pages/evaluate_subject_choice/prefer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checks: [
      { name: "物理", value: '0', checked: false },
      { name: "化学", value: '1', checked: false },
      { name: "生物", value: '2', checked: false },
      { name: "地理", value: '3', checked: false },
      { name: "政治", value: '4', checked: false },
      { name: "历史", value: '5', checked: false },
      { name: "技术", value: '6', checked: false }
    ],
    checks2: [
      { name: "物理", value: '7', checked: false },
      { name: "化学", value: '8', checked: false },
      { name: "生物", value: '9', checked: false },
      { name: "地理", value: '10', checked: false },
      { name: "政治", value: '11', checked: false },
      { name: "历史", value: '12', checked: false },
      { name: "技术", value: '13', checked: false }
    ]
    
    },


  clicks: function (e) {
    let index = e.currentTarget.dataset.index;
    let arrs = this.data.checks;
    if (arrs[index].checked == false) {
      arrs[index].checked = true;
    } else {
      arrs[index].checked = false;
    }
    this.setData({
      checks: arrs
    })
    // console.log(e)
  },

  selectSubject: function() {
    this.setData({
      bottonColor: 'red'
    })
  },

  continue_evaluate: function() {
    wx.navigateTo({
      url: '../evaluate_tips/tips'
    })
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