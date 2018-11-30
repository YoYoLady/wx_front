//first_page.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hiddenmodalput: true,
    showTopTips: false,

    radioItems: [
      { name: '杭州市二中', value: '0' },
      { name: '杭州西湖区文新中学', value: '1'}
    ],
    radioGradeItems: [
      { name: '一年级', value: '2' },
      { name: '二年级', value: '3' },
      { name: '三年级', value: '4' },
    ]
  
  },

  bindTagRadio: function() {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },

  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
  },

  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });
  },

  radioGradeChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioGradeItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioGradeItems: radioItems
    });
  },

  beginEvaluate: function () {
    wx.navigateTo({
      url: '../holland/holland'
    })
  }
});