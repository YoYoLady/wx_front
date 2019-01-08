// pages/splash/splash.js
var app = getApp();
var that = {};
const common = require('../../pages/common/common.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasInit: false,
    hasGetUserInfo: false,
    hasAuthorized: false,
    loginCode: '',
    //是否需要用按钮来授权
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    authText: "您未授权,是否登录授权?",
    adText: "跳过广告 3s",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    // 登录
    that.getUserInfo();

  },

  onReady: function() {
    this.setData({
      hasInit: that.data.hasInit,
      hasAuthorized: that.data.hasAuthorized
    });
  },

  /**
   * 通过loginCode获取业务用户信息
   */
  getUserInfo: function() {
    // 调用云函数存入user info
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getUserData',
      // 传给云函数的参数
      data: {

      }
    }).then(res => {
      app.globalData.userData = res.result;
      if (app.globalData.userData.hasWeixinInfo == undefined ||
        app.globalData.userData.hasWeixinInfo == null ||
        !app.globalData.userData.hasWeixinInfo) {
        that.getWeiXinUserInfo();
      } else {
        that.skipad();
      }
    }).catch(res => {
      console.log(res);
      common.toasterror({
        title: '获取用户信息失败',
        duration: 1000
      });
    });
  },

  /**
   * 如果是新用户或者是未授权用户，获取微信用户信息
   */
  getWeiXinUserInfo: function() {
    var authed = false;
    //检查用户信息授权情况
    wx.getSetting({
      success: function(resGetting) {
        if (resGetting.authSetting['scope.userInfo']) {
          authed = true;
        } else {
          authed = false;
        }
        that.setData({
          hasInit: true,
          hasAuthorized: authed
        });
        //已经授权直接获取数据
        if (authed) {
          that.getWeixinUserInfoAfterAuthoize();
        } else {
          //如果没有授权且低版本，直接调用getUserInfo获取数据
          if (!that.data.canIUse) {
            that.getWeixinUserInfoAfterAuthoize();
          }
        }
      }
    });

  },

  /**
   * 调用getUserInfo接口获取数据
   */
  getWeixinUserInfoAfterAuthoize() {
    // 拉取授权
    wx.getUserInfo({
      //授权成功
      success: function(ress) {
        that.setData({
          hasAuthorized: true,
          hasInit: true
        });
        console.log(ress);
        that.addWeixinUserInfo(ress);
      },
      //授权失败，弹框提示
      fail: function() {
        that.setData({
          hasAuthorized: false,
          hasInit: true
        });
        //低版本的弹框提示
        if (!that.data.canIUse) {
          that.showLowloginModal();
        }
      }
    });
  },
  /**
   * 支持opentype 1.4.0基础库
   */
  login: function(e) {
    console.log(e);
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      that.addWeixinUserInfo(e.detail);
    } else {
      //还是未授权
      that.setData({
        hasAuthorized: false,
        authText: "您未授权，请先登录授权"
      });
    }
  },

  /**
   * 低版本的授权需要弹框提示
   */
  showLowloginModal: function() {
    wx.showModal({
      title: '提示',
      content: '您尚未授权,是否打开设置界面进行授权？',
      success: function(res) {
        if (res.confirm) {
          wx.openSetting({
            success: function(ee) {
              //  授权成功
              if (ee.authSetting['scope.userInfo'] == true) {
                wx.getUserInfo({
                  success: function(ress) {
                    that.addWeixinUserInfo(ress);
                  }
                })
              } else {
                //如果还是没有授权,还是打开提示框
                that.showLowloginModal();
              }
            }
          })
        } else {
          //取消就退出页面
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },
  /**
   * 将微信用户信息添加到服务器
   */
  addWeixinUserInfo: function(res) {
    that.setData({
      hasAuthorized: true,
      userInfo: res.userInfo
    });
    // 调用云函数存入user info
    wx.cloud.callFunction({
      // 云函数名称
      name: 'addUser',
      // 传给云函数的参数
      data: res.userInfo
    }).then(res => {
      console.log("call add user success!")
      console.log(res.result)
      app.globalData.userData = res.result;
      //跳入index页面
      that.skipad();
    }).catch(res => {
      console.log("call add user fail!")
      console.log(res)
      common.toasterror({
        title: '存储用户信息失败',
        duration: 1000
      });
    })
  },

  /**
   * 跳入index页面
   */
  skipad: function() {
    wx.redirectTo({
      url: '../index/index',
    })
  }

})