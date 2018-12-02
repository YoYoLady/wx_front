//first_page.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hiddenmodalput: true,

    radioItems: [
      { name: '杭州市二中', value: '0' },
      { name: '杭州西湖区文新中学', value: '1'}
    ],
    radioGradeItems: [
      { name: '一年级', value: '1'},
      { name: '二年级', value: '2' },
      { name: '三年级', value: '3' },
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


  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    var edu_school = ''
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
      if (radioItems[i].checked) {
        edu_school = radioItems[i].name
      }
    }

    this.callUpdateUser({ edu_school: edu_school })
    
    this.setData({
      radioItems: radioItems
    });
  },

  radioGradeChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioGradeItems;
    var edu_grade = ''
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
      edu_grade = radioItems[i].name
    }
    
    this.callUpdateUser({ edu_grade: edu_grade })

    this.setData({
      radioGradeItems: radioItems
    });
  },

  callUpdateUser : function(updateData) {
    //调用云函数，更新后台数据库
    wx.cloud.callFunction({
      // 云函数名称
      name: 'updateUserInfo',
      // 传给云函数的参数
      data: updateData
    })
      .then(res => {
        console.log("call updateUserInfo success!")
        console.log(res.result) // 3
      })
      .catch(console.error)
  },

  getUserMobile : function(e) {
    console.log('input(mobile) 获取value：', e.detail.value);
    var upData = {mobile : e.detail.value}
    this.callUpdateUser(upData)
  },

  beginEvaluate: function () {
    wx.navigateTo({
      url: '../holland/holland'
    })
  }
});