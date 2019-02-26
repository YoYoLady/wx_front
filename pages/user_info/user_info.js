//first_page.js
//获取应用实例

const app = getApp()

const common = require('../../pages/common/common.js')
var phoneText = ''
Page({

  data: {
    hiddenmodalput: true,

    radioItems: [{
        name: '杭州市二中',
        value: '0'
      },
      {
        name: '杭州西湖区文新中学',
        value: '1'
      }
    ],
    radioGradeItems: [{
        name: '一年级',
        value: '1'
      },
      {
        name: '二年级',
        value: '2'
      },
      {
        name: '三年级',
        value: '3'
      },
    ]

  },

  bindTagRadio: function() {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },

  //取消按钮  
  cancel: function() {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function() {
    this.setData({
      hiddenmodalput: true
    })
  },


  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    var edu_school = ''
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
      if (radioItems[i].checked) {
        edu_school = radioItems[i].name
      }
    }

    this.callUpdateUser({
      edu_school: edu_school
    })

    this.setData({
      radioItems: radioItems
    });
  },

  radioGradeChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioGradeItems;
    var edu_grade = ''
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
      edu_grade = radioItems[i].name
    }

    this.callUpdateUser({
      edu_grade: edu_grade
    })

    this.setData({
      radioGradeItems: radioItems
    });
  },

  callUpdateUser: function(updateData) {

  },

  getUserMobile: function(e) {
    console.log('input(mobile) 获取value：', e.detail.value);
    phoneText = phoneText;
  },

  beginEvaluate: function() {
    var choosedSchool = false;
    var choosedGrade = false;
    var shcool = '';
    var grade = '';
    var phone = '';

    for (var i = 0, len = this.data.radioItems.length; i < len; ++i) {
      if (this.data.radioItems[i].checked) {
        choosedSchool = true;
        shcool = this.data.radioItems[i].name;
        break;
      }
    }
    for (var i = 0, len = this.data.radioGradeItems.length; i < len; ++i) {
      if (this.data.radioGradeItems[i].checked) {
        choosedGrade = true;
        grade = this.data.radioGradeItems[i].name;
        break;
      }
    }

    if (!choosedSchool || !choosedGrade) {
      var txt = "";
      if (!choosedGrade) {
        txt = "请选择年级";
      }
      if (!choosedSchool) {
        txt = "请选择学校";
      }
      common.toastinfo({
        title: txt,
        duration: 1000
      });
    } else {
      //调用云函数，更新后台数据库
      // wx.cloud.callFunction({
      //     // 云函数名称
      //     name: 'updateUserInfo',
      //     // 传给云函数的参数
      //     data: {
      //       edu_school: shcool,
      //       edu_grade: grade,
      //       mobile: phoneText
      //     }
      //   }).then(res => {
      //     console.log("call updateUserInfo success!")
      //     console.log(res.result)
      //     wx.redirectTo({
      //       url: '../evaluate_index/evaluate_index'
      //     })
      //   })
      //   .catch(res => {
      //     console.log(res);
      //     common.toasterror({
      //       title: '更新用户信息失败 ' + res.errMsg,
      //       duration: 1000
      //     });
      //   })

      wx.request({
        url: 'http://47.99.217.252:80/user/add',
        method: 'post',
        data: {
          user_id: 'iio',
          user_name: 'pp',
          wx_name: '33',
          wx_id : '000'
        },
        success: function (res) {
          wx.hideLoading();
          console.log(res.data)
        },
        fail: function () {
          wx.hideLoading();
          wx.showModal({
            title: '网络错误',
            content: '网络出错，请刷新重试',
            showCancel: false
          })
        }
      })

    }


  }
});